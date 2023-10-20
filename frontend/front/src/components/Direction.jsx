import React, { useState, useCallback } from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { useSelector } from "react-redux";

export default function Direction() {
  const latitude = useSelector((state) => state.latitude.value);
  const longitude = useSelector((state) => state.longitude.value);
  const coordinate = useSelector((state) => state.coordinate.value);

  var origin;

  if (typeof latitude === "number") {
    origin = { lat: latitude, lng: longitude };
  } else {
    origin = { lat: latitude.payload, lng: longitude.payload };
  }
  const destination = {
    lat: parseFloat(coordinate[2][0]),
    lng: parseFloat(coordinate[2][1]),
  };

  const transitPoints = [
    {
      location: {
        lat: parseFloat(coordinate[0][0]),
        lng: parseFloat(coordinate[0][1]),
      },
    },
    {
      location: {
        lat: parseFloat(coordinate[1][0]),
        lng: parseFloat(coordinate[1][1]),
      },
    },
  ];

  const [currentDirection, setCurrentDirection] = useState(null);

  const directionsCallback = useCallback((googleResponse) => {
    if (googleResponse) {
      if (currentDirection) {
        if (
          googleResponse.status === "OK" &&
          googleResponse.geocoded_waypoints.length !==
            currentDirection.geocoded_waypoints.length
        ) {
          console.log("ルートが変更されたのでstateを更新する");
          setCurrentDirection(googleResponse);
        } else {
          console.log("前回と同じルートのためstateを更新しない");
        }
      } else {
        if (googleResponse.status === "OK") {
          console.log("初めてルートが設定されたため、stateを更新する");
          setCurrentDirection(googleResponse);
        } else {
          console.log("前回と同じルートのためstateを更新しない");
        }
      }
    }
  });

  return (
    <>
      <DirectionsService
        options={{
          origin: origin,
          destination: destination,
          travelMode: "DRIVING",
          optimizeWaypoints: false,
          waypoints: transitPoints,
        }}
        callback={directionsCallback}
      />
      {currentDirection !== null && (
        <DirectionsRenderer
          options={{
            directions: currentDirection,
          }}
        />
      )}
    </>
  );
}
