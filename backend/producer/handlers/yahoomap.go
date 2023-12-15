package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

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

	yahoo_api := os.Getenv("YAHOO_API_KEY")

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

