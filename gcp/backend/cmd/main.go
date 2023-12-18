package main

import (
	"log"
	// Blank-import the function package so the init() runs
	"github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	_ "example.com/hello"
)

// func init() {
// 	functions.HTTP("HelloHTTP", HelloHTTP)

// }

// func HelloHTTP(w http.ResponseWriter, r *http.Request) {
// 	router := gin.Default()
// 	router.GET("/avatar", handlers.Avatar)
// 	router.GET("/map", handlers.YahooMap)

// 	router.ServeHTTP(w, r)
// }

func main() {
	port := "8080"
  if err := funcframework.Start(port); err != nil {
    log.Fatalf("funcframework.Start: %v\n", err)
  }
}
