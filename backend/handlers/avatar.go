package handlers

import (
	"context"
	"fmt"
	"os"
	"net/http"
	"regexp"
	"strings"
	"github.com/joho/godotenv" //環境変数(.env)を読み込む
	"github.com/gin-gonic/gin"
	"github.com/sashabaranov/go-openai"
	"strconv" //文字列と数値を変換する
)

func Avatar(c *gin.Context) {

	contents := c.Query("text")
	animation := "03"      // "01"~"10"
	animationTime := "1.0" // 小数点第一位まで

	//fmt.Println(contents)

	if contents == "settings..." {
		contents = "こんにちは.あなたの名前を教えてね！"
		animation = "01"
		animationTime = "2.5"
	}
	if contents == "スタート" {
		contents = "旅行する場所を決めよう！"
		animation = "01"
		animationTime = "1.5"
	}
	if contents == "検索" {
		contents = "ルートを検索するね。ちょっと待ってて。"
		animation = "05"
		animationTime = "2.5"
	}
	if contents == "検索完了" {
		contents = "どのプランがいいかなー？"
		animation = "02"
		animationTime = "1.5"
	}
	if contents == "決定" {
		contents = "いいプランだね！楽しみ！"
		animation = "05"
		animationTime = "3.5"
	}
	//"移動中、(place)"
	//引数：[関係性，名前，場所]
	re := regexp.MustCompile(`移動中、.*、.*、.*`)
	if re.MatchString(contents) {
		relationCode := strings.Split(contents, "、")[1]
		userName := strings.Split(contents, "、")[2]
		place := strings.Split(contents, "、")[3]
		contents = AvatarInfomation(relationCode, userName, place, 20)	
		animation = "09"
		animationTime = "6.0"
	}
	//"到着、(place)"
	re = regexp.MustCompile(`到着、.*、.*、.*`)
	if re.MatchString(contents) {
		relationCode := strings.Split(contents, "、")[1]
		userName := strings.Split(contents, "、")[2]
		place := strings.Split(contents, "、")[3]
		contents = AvatarInfomation(relationCode, userName, place, 30)	
		animation = "03"
		animationTime = "1.5"
	}
	//"user、(message)"
	re = regexp.MustCompile(`user、.*`)
	if re.MatchString(contents) {
		message := strings.Split(contents, "、")[1]
		contents = message
		animation = "10"
		animationTime = "2.0"
	}

	c.JSON(http.StatusOK, gin.H{
		"status":        "200",
		"memory":        contents,
		"animation":     animation,
		"animationTime": animationTime,
	})
}

// handlers.Informationと同じ処理
func AvatarInfomation(relationCode string, userName string, place string, charCount int) string {

	// ．envファイルを読み込む
	err := godotenv.Load(".env")
	
	// もし err がnilではないなら、"読み込み出来ませんでした"が出力される
	if err != nil {
		fmt.Printf("読み込み出来ませんでした: %v", err)
	} 
	
	//関係性を文字列に変換
	var relation string
	if relationCode == "1" {
		relation = "恋人"
	} else if relationCode == "2" {
		relation = "友人"
	} else if relationCode == "3" {
		relation = "推し"
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
					Content: "あなたは"+ userName + "さんの" + relation + "です。「" + place + "」という場所関する豆知識を" + userName + "さんに" + strconv.Itoa(charCount) + "字程度で教えてあげてください。口調は"+ relation + "という関係を意識してください。",
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
