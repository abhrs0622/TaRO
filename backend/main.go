package main

import (
	"context"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda

func init() {
	router := gin.Default()
	router.GET("/avatar", avatar)

	router.Run("localhost:8080")

	// ginLambda = ginadapter.New(router)
}

func avatar(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{"message": "avatar test"})
}

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(Handler)
}
