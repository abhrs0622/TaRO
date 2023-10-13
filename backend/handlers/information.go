package handlers

import (
	//"net/http"
	"context"
	"github.com/gin-gonic/gin"
	"github.com/sashabaranov/go-openai"
	"fmt"
)

// ロード画面でアバターが話す内容を返す関数
//　json形式で地名を受け取り，一度chatGPTのAPIに「（地名）に関連した豆知識を教えて」という文章をPOSTし，返ってきた文章をjson形式で返す


func Infomation(c *gin.Context) {

	//chatGPTのAPIを叩くためのAPIキー
	API_KEY := "YOUR_API_KEY"


	// 地名を受け取る
	// place := c.PostForm("place")
	place := "東京" // テスト用
	
	// chatGPTのAPIにPOSTする
	

	client := openai.NewClient(API_KEY)
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "「" + place + "」に関連した豆知識を教えて",
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
	// c.IndentedJSON(http.StatusOK, gin.H{"message": "handlers test"})
}

