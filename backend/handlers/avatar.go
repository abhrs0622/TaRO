package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Avatar(c *gin.Context) {
	// 送信されたリクエストデータからアバターの名前とアバターとの関係性をJSONにして返す
	name := c.PostForm("name")
	relationship := c.PostForm("relationship")
	c.IndentedJSON(http.StatusCreated, gin.H{
		"name":         name,
		"relationship": relationship,
	})
}
