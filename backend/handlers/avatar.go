package handlers

import (
	"context"
	"fmt"
	"net/http"
	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sashabaranov/go-openai"
)

func Avatar(c *gin.Context) {
	contents := c.Query("text")
	animation := "03"      // "01"~"10"
	animationTime := "1.0" // 小数点第一位まで

	//fmt.Println(contents)

	if contents == "settings..." {
		contents = "こんにちは.あなたの名前を教えてね！"
		animation = "10"
		animationTime = "1.5"
	}
	if contents == "スタート" {
		contents = "旅行する場所を決めよう！"
		animation = "03"
		animationTime = "1.5"
	}
	if contents == "検索" {
		contents = "ルートを探してみるから、ちょっと待っててね。"
		animation = "03"
		animationTime = "1.5"
	}
	if contents == "検索完了" {
		contents = "どのプランがいいかな"
		animation = "03"
		animationTime = "1.5"
	}
	if contents == "決定" {
		contents = "良いプランだね.旅行するのが楽しみ！"
		animation = "03"
		animationTime = "1.5"
	}
	//"移動中、(place)"
	re := regexp.MustCompile(`移動中、.*`)
	if re.MatchString(contents) {
		place := strings.Split(contents, "、")[1]
		contents = AvatarInfomation(place)
		animation = "03"
		animationTime = "1.5"
	}
	//"到着、(place)"
	re = regexp.MustCompile(`到着、.*`)
	if re.MatchString(contents) {
		place := strings.Split(contents, "、")[1]
		contents = place
		animation = "03"
		animationTime = "1.5"
	}
	//"user、(message)"
	re = regexp.MustCompile(`user、.*`)
	if re.MatchString(contents) {
		message := strings.Split(contents, "、")[1]
		contents = message
		animation = "03"
		animationTime = "1.5"
	}

	c.JSON(http.StatusOK, gin.H{
		"status":        "200",
		"memory":        contents,
		"animation":     animation,
		"animationTime": animationTime,
	})
}

// handlers.Informationと同じ処理
func AvatarInfomation(place string) string {

	//chatGPTのAPIを叩くためのAPIキー
	API_KEY := "YOUR_API_KEY"

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
		return "error"
	}

	return resp.Choices[0].Message.Content
}
