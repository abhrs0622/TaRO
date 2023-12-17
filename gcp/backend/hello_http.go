package helloworld

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"

	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sashabaranov/go-openai"
)


func init() {
	functions.HTTP("HelloHTTP", HelloHTTP)

}

func HelloHTTP(w http.ResponseWriter, r *http.Request) {
	router := gin.Default()

	config := cors.DefaultConfig()

    config.AllowOrigins = []string{"*"}
    router.Use(cors.New(config))

	router.GET("/map", YahooMap)
	router.GET("/avatar", Avatar)

	router.ServeHTTP(w, r)
}


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
	//"移動中、(place)"　関係性・名前・場所
	re := regexp.MustCompile(`移動中、.*`)
	if re.MatchString(contents) {
		relationCode := strings.Split(contents, "、")[1]
		userName := strings.Split(contents, "、")[2]
		latitude := strings.Split(contents, "、")[3]
		altitude := strings.Split(contents, "、")[4]
		contents = AvatarInfomation(relationCode, userName, latitude, altitude, 20)
		animation = "09"
		animationTime = "6.0"
	}
	//"到着、(place)"
	re = regexp.MustCompile(`到着、.*`)
	if re.MatchString(contents) {
		relationCode := strings.Split(contents, "、")[1]
		userName := strings.Split(contents, "、")[2]
		latitude := strings.Split(contents, "、")[3]
		altitude := strings.Split(contents, "、")[4]
		contents = AvatarInfomation(relationCode, userName, latitude, altitude, 20)
		animation = "03"
		animationTime = "1.5"
	}
	//受け取る変数の例)"user、{message}"
	re = regexp.MustCompile(`user、.*`)
	if re.MatchString(contents) {
		message := strings.Split(contents, "、")[1]
		//avatarInformation()をそのまま使うために，latitudeにはmessageを，altitudeには999を入れて渡す
		contents = AvatarInfomation("0", " ", "999", message, 20)
		animation = "10"
		animationTime = "2.0"
	}

	c.JSON(http.StatusOK, gin.H{
		"status":                      "200",
		"memory":                      contents,
		"animation":                   animation,
		"animationTime":               animationTime,

	})
}

// handlers.Informationと同じ処理
func AvatarInfomation(relationCode string, userName string, latitude string, altitude string, charCount int) string {

	// ．envファイルを読み込む
	// err := godotenv.Load("../.env")

	// // もし err がnilではないなら、"読み込み出来ませんでした"が出力される
	// if err != nil {
	// 	fmt.Printf("読み込み出来ませんでした: %v", err)
	// }

	//関係性を文字列に変換
	var relation string
	if relationCode == "1" {
		relation = "恋人"
	} else if relationCode == "2" {
		relation = "友人"
	} else if relationCode == "3" {
		relation = "推し"
	}else{
		relation = ""
	}

	//chatGPTのAPIを叩くためのAPIキー
	API_KEY := os.Getenv("OPENAI_KEY")

	// chatGPTのAPIにPOSTする
	client := openai.NewClient(API_KEY)

	postContent := ""

	if latitude == "999" { //アバターと会話する時
		postContent = "ある人から「" + altitude + "」という質問が来たと想定し、" + strconv.Itoa(charCount) + "字程度で答えてあげてください。女の子口調を意識してください。"
	}else{
		postContent = "あなたは"+ userName + "さんの" + relation + "です。地図上で緯度" + latitude + "・軽度"+ altitude +"の場所関する豆知識を" + userName + "さんに" + strconv.Itoa(charCount) + "字程度で教えてあげてください。口調は"+ relation + "という関係を意識してください。"
	}

	//メッセージを返す
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: postContent,
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

type Schedule struct {
	Place   string `json:"place"`
	Latitude string `json:"latitude"`
	Longitude string `json:"longitude"`
}

type YahooApiResponse struct {

    Feature []struct {
        Name     string `json:"Name"`
        Geometry struct {
            Coordinates string `json:"Coordinates"`
        } `json:"Geometry"`
    } `json:"Feature"`
}

func YahooMap(c *gin.Context) {
	lat := c.Query("lat")
	lon := c.Query("lon")

	yahoo_api := os.Getenv("YAHOO_API")

	resp, err := http.Get(yahoo_api + "lat=" + lat + "&lon=" + lon)
        if err != nil {
            log.Fatal(err)
        }
        defer resp.Body.Close()

	fmt.Printf("response Status: %s\n", resp.Status)

	body, err := io.ReadAll(resp.Body)
    if err != nil {
        log.Fatal(err)
    }

    var yahooResp YahooApiResponse
    err = json.Unmarshal(body, &yahooResp)
    if err != nil {
        log.Fatal(err)
    }

	var plans [][]Schedule
	var attractions []Schedule

    for _, feature := range yahooResp.Feature {
        coords := strings.Split(feature.Geometry.Coordinates, ",")
        attractions = append(attractions, Schedule{
                Place:     feature.Name,
                Latitude:  coords[1],
                Longitude: coords[0],
            })
    }

	plans = append(plans, attractions[0:3])
	plans = append(plans, attractions[3:6])
	plans = append(plans, attractions[6:9])

	var responseData = gin.H{
		"message": "",
		"data": []gin.H{},
	}

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

	c.IndentedJSON(http.StatusOK, responseData)
}
