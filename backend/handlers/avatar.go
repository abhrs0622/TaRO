package handlers

import (
	"fmt"
	"net/http"
	"regexp"
	"strings"

	"github.com/abhrs0622/TaRO/handlers"
	"github.com/gin-gonic/gin"
)

func Avatar(c *gin.Context) {
	contents := c.Query("text")
	animation := "03"      // "01"~"10"
	animationTime := "1.0" // 小数点第一位まで

	fmt.Println(contents)

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
	//"移動中、(場所名)"
	re := regexp.MustCompile(`移動中、.*`)
	if re.MatchString(contents) {
		place := strings.Split(contents, "、")[1]
		contents = place
		animation = "03"
		animationTime = "1.5"
		handlers.Test
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

/*
func Avatar(c *gin.Context) {
	// 送信されたリクエストデータからアバターの名前とアバターとの関係性をJSONにして返す
	name := c.PostForm("name")
	relationship := c.PostForm("relationship")
	id := c.PostForm("id")
	cource := c.PostForm("cource")
	c.IndentedJSON(http.StatusCreated, gin.H{
		"name":         name,
		"relationship": relationship,
	})
}
*/
