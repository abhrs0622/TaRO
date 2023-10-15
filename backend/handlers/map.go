package handlers

import (
	"context"
	"net/http"
	"fmt"
	"strings"

	"github.com/joho/godotenv"
	"github.com/gin-gonic/gin"
	"github.com/sashabaranov/go-openai"
)

type Schedule struct {
	Place   string `json:"place"`
	Latitude string `json:"latitude"`
	Longitude string `json:"longitude"`
}

func Map(c *gin.Context) {
	value := c.Query("value")

	err := godotenv.Load(".env")
	
	if err != nil {
		fmt.Printf("読み込み出来ませんでした: %v", err)
	} 
	
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

// 	response := `了解しました。以下は、要求された形式のCSVデータです。

// プラン1:
// 時間,場所,住所,緯度経度
// 09:00,東京タワー,東京都港区芝公園４丁目２−８,35.658584,139.745431
// 11:00,浅草寺,東京都台東区浅草２丁目３−１,35.714285,139.796692
// 13:00,上野公園,東京都台東区上野公園,35.714603,139.771699

// プラン2:
// 時間,場所,住所,緯度経度
// 09:00,東京ディズニーランド,千葉県浦安市舞浜１−１,35.632896,139.880394
// 12:00,東京スカイツリー,東京都墨田区押上１丁目１−２,35.710063,139.8107
// 15:00,江戸東京博物館,東京都台東区上野公園４丁目１−１,35.714622,139.776539

// プラン3:
// 時間,場所,住所,緯度経度
// 10:00,新宿御苑,東京都新宿区内藤町１１,35.685175,139.710328
// 12:30,明治神宮,東京都渋谷区代々木神園町１６−２,35.676397,139.699388
// 15:00,原宿竹下通り,東京都渋谷区神宮前１−１１−６,35.67109,139.705267

// 各プランは「plan + 数字:」の行から始め、時間、場所、住所、緯度経度の順番で区切られています。`

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

	responseData := gin.H{
		"message": "Success",
		"data": []gin.H{},
	}

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

	c.IndentedJSON(http.StatusCreated, responseData)
}