package handlers

import (
	"net/http"

	"fmt"
	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
)

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

// 仮の関数です
func Avatar(c *gin.Context) {
	contents := c.Query("text")
	animation := "03"      // "01"~"10"
	animationTime := "1.0" // 小数点第一位まで

	fmt.Println(contents)

	if contents == "settings..." {
		contents = "こんにちは.あなたの名前を教えてほしい！"
		animation = "10"
		animationTime = "1.5"
	}
	if contents == "スタート" {
		contents = "旅行する場所を決めよう！"
		animation = "10"
		animationTime = "1.5"
	}
	if contents == "検索" {
		contents = "ルートを探してみるから.ちょっと待っててね。"
		animation = "10"
		animationTime = "1.5"
	}
	if contents == "検索完了" {
		contents = "どのプランがいいかな"
		animation = "10"
		animationTime = "1.5"
	}
	if contents == "決定" {
		contents = "良いプランだね.旅行するのが楽しみ！"
		animation = "10"
		animationTime = "1.5"
	}
	//"移動中、(id)"
	re := regexp.MustCompile(`移動中、.*`)
	if re.MatchString(contents) {
		id := strings.Split(contents, "、")[1]
		contents = id
		animation = "10"
		animationTime = "1.5"
	}
	//"到着、(place)"
	re = regexp.MustCompile(`到着、.*`)
	if re.MatchString(contents) {
		place := strings.Split(contents, "、")[1]
		contents = place
		animation = "10"
		animationTime = "1.5"
	}
	//"user、(message)"
	re = regexp.MustCompile(`user、.*`)
	if re.MatchString(contents) {
		message := strings.Split(contents, "、")[1]
		contents = message
		animation = "10"
		animationTime = "1.5"
	}

	c.JSON(http.StatusOK, gin.H{
		"status":        "200",
		"memory":        contents,
		"animation":     animation,
		"animationTime": animationTime,
	})
}
