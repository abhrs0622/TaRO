package handlers

import (
	"context"
	"fmt"
	"os"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv" //環境変数(.env)を読み込む
	"github.com/sashabaranov/go-openai"
)


func Communication(c *gin.Context) {
	// ．envファイルを読み込む
	err := godotenv.Load(".env")

	// もし err がnilではないなら、"読み込み出来ませんでした"が出力される
	if err != nil {
		fmt.Printf("読み込み出来ませんでした: %v", err)
	} 

	//chatGPTのAPIを叩くためのAPIキー
	API_KEY := os.Getenv("YOUR_API_KEY")

	// chatGPTのAPIにPOSTする
	client := openai.NewClient(API_KEY)
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "こんにちは",
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		
	}

	c.JSON(http.StatusOK, gin.H{
		"status":                      "200",
		"memory":                      resp.Choices[0].Message.Content,
		
	})
}

