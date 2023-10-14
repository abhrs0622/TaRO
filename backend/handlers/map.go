package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Map(c *gin.Context) {
	c.IndentedJSON(http.StatusCreated, gin.H{"message": "handlers test"})
}