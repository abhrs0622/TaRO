package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sashabaranov/go-openai"
)

// ロード画面でアバターが話す内容を返す関数
//　json形式で地名を受け取り，一度chatGPTのAPIに「（地名）に関連した豆知識を教えて」という文章をPOSTし，返ってきた文章をjson形式で返す

func Infomation(c *gin.Context) {
	// 地名を受け取る
	place := c.PostForm("place")

	// chatGPTのAPIにPOSTする
	type RequestBody struct {
		Text string `json:"text"`
	}
	reqBody := RequestBody{Text: place + "に関連した豆知識を教えて"}
	reqBodyBytes, err := json.Marshal(reqBody)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "failed to marshal request body"})
		return
	}

	client := openai.NewClient("YOUR_API_KEY")
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "Hello!",
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}

	fmt.Println(resp.Choices[0].Message.Content)
	// ここで返ってきた文章をjson形式で返す
	c.IndentedJSON(http.StatusOK, gin.H{"message": "handlers test"})
}

func Test(c *gin.Context) {
	fmt.Printf("hi")
}
