package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/sashabaranov/go-openai"
)

func Handler(ctx context.Context, sqsEvent events.SQSEvent) error {
	// get (latitude, longitude) from Amazon SQS
	value := sqsEvent.Records[len(sqsEvent.Records) - 1].Body
	MakePlans(value)

    return nil
}

func main() {
    lambda.Start(Handler)
}

type Schedule struct {
	Place   string `json:"place"`
	Latitude string `json:"latitude"`
	Longitude string `json:"longitude"`
}

func MakePlans(value string) {

	API_KEY := os.Getenv("YOUR_API_KEY")
	client := openai.NewClient(API_KEY)

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleSystem,
					Content: "You are the smartest tour planner for programmer",
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "カンマ区切りのCSVデータが必要です。",
				},
				{
					Role:    openai.ChatMessageRoleAssistant,
					Content: "わかりました。カンマ区切りのCSVデータを提供します。",
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "住所に郵便番号は必要ありません。",
				},
				{
					Role:    openai.ChatMessageRoleAssistant,
					Content: "わかりました。住所に郵便番号を含めずに提供します。",
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "日本語のデータのみ必要です。",
				},
				{
					Role:    openai.ChatMessageRoleAssistant,
					Content: "わかりました。日本語のデータのみを提供します。",
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "CSVタイトルは、それぞれ時間、場所、住所、緯度経度としてください。",
				},
				{
					Role:    openai.ChatMessageRoleAssistant,
					Content: "わかりました。CSVタイトルは、それぞれ時間、場所、住所、緯度経度として提供します。",
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "1つのCSVには3つのデータが入ります。",
				},
				{
					Role:    openai.ChatMessageRoleAssistant,
					Content: "わかりました。1つのCSVには、3つのデータを入れて提供します。",
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "緯度経度が" + value + "である場所からタクシーを使用して1日でこの近辺の観光地を回るプランを時間と場所と住所と緯度経度という順番で区切ったカンマ区切りのCSV形式で3つ作ってください。各プランは「plan + 数字:」の行から始めてください。",
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}

	response := resp.Choices[0].Message.Content
	lines := strings.Split(response, "\n")

	var plans [][]Schedule
	var attractions []Schedule

	// ChatGPTは3つの観光地の組(Schedule)を3種類出力する
	for _, line := range lines {
		parts := strings.Split(line, ",")
		if parts[0] == "時間" {
			if len(attractions) > 0 {
				plans = append(plans, attractions)
			}
			attractions = make([]Schedule, 0)
		}
		if len(parts) >= 5 && parts[0] != "時間" {
			place := parts[1]
			latitude := parts[3]
			longitude := parts[4]
			attraction := Schedule{place, latitude, longitude}
			attractions = append(attractions, attraction)
		}
	}
	if len(attractions) > 0 {
		plans = append(plans, attractions)
	}

	// DynamoDBにinputするため, binaryに変換
	jsonData, err := json.Marshal(plans)
	if err != nil {
		fmt.Printf("responseをJSONに変換できませんでした。: %v", err)
	}
	binaryData := []byte(jsonData)

	sess, _ := session.NewSession()
	db := dynamodb.New(sess)
	tableName := os.Getenv("DYNAMO_TABLE")

	input := &dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"plansID": {
				N: aws.String("1"),
			},
			"binary": {
				B: binaryData,
			},
		},
		TableName: aws.String(tableName),
	}

	db.PutItem(input)
}
