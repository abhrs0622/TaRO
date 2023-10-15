package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv" //環境変数(.env)を読み込む
	"github.com/sashabaranov/go-openai"
)

func Avatar(c *gin.Context) {

	contents := c.Query("text")
	animation := "03"      // "01"~"10"
	animationTime := "1.0" // 小数点第一位まで

	//fmt.Println(contents)
	//場面の条件分岐
	if contents == "settings..." {
		contents = "こんにちは.あなたの名前を教えてね！"
		animation = "01"
		animationTime = "2.5"
	}
	if contents == "スタート" {
		contents = "旅行する場所を決めるよ！"
		animation = "01"
		animationTime = "1.5"
	}
	if contents == "検索" {
		contents = "ルートを探してみるから、ちょっと待っててね。"
		animation = "05"
		animationTime = "2.5"
	}
	if contents == "検索完了" {
		contents = "どのプランがいいかなー？"
		animation = "02"
		animationTime = "1.5"
	}
	if contents == "決定" {
		contents = "いいプランだと思うよ！旅行するのが楽しみだね！"
		animation = "05"
		animationTime = "3.5"
	}
	//受け取る変数の例)"移動中、[place}"
	re := regexp.MustCompile(`移動中、.*`)
	if re.MatchString(contents) {
		place := strings.Split(contents, "、")[1]
		//豆知識生成
		contents = AvatarInfomation(place)
		animation = "09"
		animationTime = "3.0"
	}
	//受け取る変数の例)"到着、{place}"
	re = regexp.MustCompile(`到着、.*`)
	if re.MatchString(contents) {
		place := strings.Split(contents, "、")[1]
		contents = place
		animation = "03"
		animationTime = "1.5"
	}
	//受け取る変数の例)"user、{message}"
	re = regexp.MustCompile(`user、.*`)
	if re.MatchString(contents) {
		message := strings.Split(contents, "、")[1]
		contents = message
		animation = "10"
		animationTime = "2.0"
	}

	c.JSON(http.StatusOK, gin.H{
		"status":                      "200",
		"memory":                      contents,
		"animation":                   animation,
		"animationTime":               animationTime,
		"Access-Control-Allow-Origin": "*", //CORS回避
	})
}

// handlers.Informationと同じ処理
func AvatarInfomation(place string) string {

	// ．envファイルを読み込む
	err := godotenv.Load(".env")

	// もし err がnilではないなら、"読み込み出来ませんでした"が出力されます。
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
					Content: "「" + place + "」に関連した豆知識を50字程度・標準語・女の子口調で教えて",
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
