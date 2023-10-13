// // 経路推薦
// import React, { useState, useCallback } from "react";
// import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

// export default function Direction() {
//   const origin = { lat: 42.755955, lng: 141.32816 };
//   // 始点を指定する
//   const destination = { lat: 45.299023, lng: 141.65308 };
//   // 終点を指定する
//   const transitPoints = [
//     {
//       location: { lat: 43.66406, lng: 142.85445 },
//       stopover: true,
//     },
//     { location: { lat: 43.906742, lng: 144.79872 } },
//     { location: { lat: 43.286533, lng: 143.18524 } },
//   ];
//   // 経由地を（順不同で）指定する

//   const [currentDirection, setCurrentDirection] = useState(null);
//   // ここにDirectionsServiceへのAPIコールで得られたルート情報を保存する

//   const directionsCallback = useCallback((googleResponse) => {
//     if (googleResponse) {
//       if (currentDirection) {
//         if (
//           googleResponse.status === "OK" &&
//           googleResponse.geocoded_waypoints.length !==
//             currentDirection.geocoded_waypoints.length
//         ) {
//           console.log("ルートが変更されたのでstateを更新する");
//           setCurrentDirection(googleResponse);
//         } else {
//           console.log("前回と同じルートのためstateを更新しない");
//         }
//       } else {
//         if (googleResponse.status === "OK") {
//           console.log("初めてルートが設定されたため、stateを更新する");
//           setCurrentDirection(googleResponse);
//         } else {
//           console.log("前回と同じルートのためstateを更新しない");
//         }
//       }
//     }
//   });
//   // (1) DirectionsServiceコンポーネントはレンダーされるとルート検索し、結果をcallbackとして返す。
//   // (2) このAPIレスポンスを今回のようにstateに保存すると、stateが変わったことにより、DirecitonsServiceコンポーネントが再度レンダーされる。
//   // (3) DirectionsServiceコンポーネントがレンダーされると再度APIコールを行う。
//   // 上記(1)~(3)の無限ループを防ぐため、(3)の結果がstateと変わらなければstateを更新しない、という処理を上記に実装した

//   return (
//     <>
//       <DirectionsService
//         options={{
//           origin,
//           destination,
//           travelMode: "DRIVING",
//           // 走行モードを指定する。今回は自動車に設定
//           optimizeWaypoints: true,
//           // 経由地の順序を最適化する場合はtrueに設定する
//           waypoints: transitPoints,
//         }}
//         callback={directionsCallback}
//       />
//       {currentDirection !== null && (
//         <DirectionsRenderer
//           options={{
//             directions: currentDirection,
//           }}
//         />
//         // DirectionsServiceのAPI検索の結果としてcurrenctDirectionがあれば、その結果をDirectionsRendererで表示する。
//         // 予めルート情報を持っていれば、DirecitonsServiceでAPIコールする必要はない。
//       )}
//     </>
//   );
// }
