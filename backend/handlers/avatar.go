package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Avatar(c *gin.Context) {
	c.IndentedJSON(http.StatusCreated, gin.H{"message": "handlers test"})
}