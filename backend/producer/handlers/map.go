package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	// "github.com/aws/aws-sdk-go/service/sqs"　// エラー消しのために一時的にコメントアウト
	"github.com/gin-gonic/gin"
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

// 緯度・軽度を受け取り, そのままSQSに送る
func Map(c *gin.Context) {
	// value := c.Query("value") // エラー消しのために一時的にコメントアウト

	// DynamoDBのplansを空にする
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

//// エラー消しのために一時的にコメントアウト
	// send value to AWS SQS
	// svc := sqs.New(sess)
	// qURL := os.Getenv("SQS_URL")

	// result, err := svc.SendMessage(&sqs.SendMessageInput{
    //     DelaySeconds: aws.Int64(10),
    //     MessageBody: aws.String(value),
    //     QueueUrl:    &qURL,
    // })
//// エラー消しのために一時的にコメントアウト(ここまで)

    if err != nil {
        fmt.Println("Error while sending message to SQS", err)
        return
    }

	c.IndentedJSON(http.StatusCreated, gin.H{"message": "accepted"})
}

// DynamoDBに保存された3観光地の三組を取り出す
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
		fmt.Println("Cannot get value from DynamoDB", err)
	}

	item := res2.Item
	binaryId := item["binary"]

	var output [][]Schedule
	fmt.Println(&binaryId.B)
	json.Unmarshal(binaryId.B, &output)

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
