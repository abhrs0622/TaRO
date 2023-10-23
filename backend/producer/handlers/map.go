package handlers

import (
	"context"
	"net/http"
	"fmt"
	"strings"
	"os"
	"encoding/json"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/sqs"
	// "github.com/joho/godotenv"
	"github.com/gin-gonic/gin"
	"github.com/sashabaranov/go-openai"
)

type Schedule struct {
	Place   string `json:"place"`
	Latitude string `json:"latitude"`
	Longitude string `json:"longitude"`
}

var responseData = gin.H{
	"message": "",
	"data": []gin.H{},
}

func Map(c *gin.Context) {
	value := c.Query("value")
	fmt.Printf("%T\n", value)

	var plans [][]Schedule
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

	// send value to AWS SQS
	svc := sqs.New(sess)

	qURL := os.Getenv("SQS_URL")

	result, err := svc.SendMessage(&sqs.SendMessageInput{
        DelaySeconds: aws.Int64(10),
        MessageBody: aws.String(value),
        QueueUrl:    &qURL,
    })

    if err != nil {
        fmt.Println("Error", err)
        return
    }

    fmt.Println("Success", *result.MessageId)

	c.IndentedJSON(http.StatusCreated, gin.H{"message": "accepted"})
}

func GetPlans(c *gin.Context) {
	sess, _ := session.NewSession()
	db := dynamodb.New(sess)

	tableName := os.Getenv("DYNAMO_TABLE")

	params := &dynamodb.GetItemInput{
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"plansID": {
				N: aws.String("1"),
			},
		},
	}

	res2, err := db.GetItem(params)

	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println("getItem: ", res2)

	item := res2.Item
	binaryId := item["binary"]

	var output [][]Schedule
	fmt.Println(&binaryId.B)
	json.Unmarshal(binaryId.B, &output)
	fmt.Println("output: ", output)

	responseData = gin.H{
		"message": "",
		"data": []gin.H{},
	}

	responseData["message"] = "Success"

	for _, plan := range output {
		planData := []gin.H{}
		for _, schedule := range plan {
			planData = append(planData, gin.H{
                "place":    schedule.Place,
                "latitude":   schedule.Latitude,
                "longitude": schedule.Longitude,
            })
		}
		responseData["data"] = append(responseData["data"].([]gin.H), gin.H{"plan": planData})
	}

	c.IndentedJSON(http.StatusCreated, responseData)
}

// func MakePlans(c *gin.Context) {
func MakePlans(value string) {
	// value := c.Query("value")

	// err := godotenv.Load(".env")

	// if err != nil {
	// 	fmt.Printf("読み込み出来ませんでした: %v", err)
	// }

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
	fmt.Println(response)


	lines := strings.Split(response, "\n")

	var plans [][]Schedule
	var attractions []Schedule

	for _, line := range lines {
		parts := strings.Split(line, ",")
		if len(line) > 0 && line[len(line) - 1] == ':' {
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

	fmt.Println(plans)

	responseData["message"] = "Success"

	for _, plan := range plans {
		planData := []gin.H{}
		for _, schedule := range plan {
			planData = append(planData, gin.H{
                "place":    schedule.Place,
                "latitude":   schedule.Latitude,
                "longitude": schedule.Longitude,
            })
		}
		responseData["data"] = append(responseData["data"].([]gin.H), gin.H{"plan": planData})
	}

	jsonData, err := json.Marshal(plans)
	if err != nil {
		fmt.Printf("responseをJSONに変換できませんでした。: %v", err)
	}

	fmt.Println(plans)
	fmt.Printf("planDataType: %T\n", plans)

	binaryData := []byte(jsonData)

	fmt.Println(binaryData)

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

	params := &dynamodb.GetItemInput{
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"plansID": {
				N: aws.String("1"),
			},
		},
	}

	res2, err := db.GetItem(params)

	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println("getItem: ", res2)

	item := res2.Item
	binaryId := item["binary"]

	var output []Schedule
	fmt.Println(&binaryId.B)
	json.Unmarshal(binaryId.B, &output)
	fmt.Println("output: ", output)

	// c.IndentedJSON(http.StatusCreated, responseData)
}
