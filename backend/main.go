package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/gin-contrib/cors"
	"github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/abhrs0622/TaRO/handlers"
)

var ginLambda *ginadapter.GinLambda

func init() {
	router := gin.Default()

	//CORS回避
	config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000"} //許可するオリジンを記述：今回はフロントからのアクセスを許可したいので，フロントのURLを記述
    router.Use(cors.New(config))


	router.GET("/avatar", handlers.Avatar)
	router.GET("/map", handlers.Map)

	router.Run("localhost:8080")

	// ginLambda = ginadapter.New(router)
}

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(Handler)
}
