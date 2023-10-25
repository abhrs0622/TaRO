package main

import (
	"context"

	"github.com/abhrs0622/TaRO/handlers"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda

func init() {
	router := gin.Default()

	//CORS回避
	config := cors.DefaultConfig()
    config.AllowOrigins = []string{"*"}
    router.Use(cors.New(config))

	router.GET("/avatar", handlers.Avatar)
	router.GET("/map", handlers.Map)
	router.GET("/get-plans", handlers.GetPlans)

	// router.Run("localhost:8080")

	ginLambda = ginadapter.New(router)
}

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(Handler)
}
