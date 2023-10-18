# TaRO frontend

![TaRO_frontend_アプリケーション構成](https://github.com/abhrs0622/TaRO/assets/103473179/b311f060-e918-4dd0-a18c-21fa789b50be)

## フロントの起動方法（ローカル環境）

### ライブラリのインストール
+ googlemap api
  + ```npm install @googlemaps/react-wrapper```
  + 参考（https://developers.google.com/maps/documentation/javascript/react-map?hl=ja）
+ ページ遷移関連
  + ```npm install react-router-dom```
+ API 取得のためのコンポーネント
  + ```npm install axios```
+  Yotube
   +  ```npm install react-youtube```
+  reactとUnityの連携
   + ```npm install react-unity-webgl```

### APIキーの取得
+ Google Maps PlatformのAPIキーを取得する
  + [Google Maps Platform：APIキーの使用方法](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=ja)
+ Google Cloud APIsでCloud Text-to-Speech APIとCloud Speech-to-Text APIを有効にする
  + [Google Cloud Console](https://console.cloud.google.com/apis/library?hl=ja)
+ Google Cloud APIsのAPIキーを取得する
  + [Google Cloud APIs：APIキーの使用方法](https://cloud.google.com/docs/authentication/api-keys?hl=ja#:~:text=API%20%E3%82%AD%E3%83%BC%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B,-API%20%E3%82%AD%E3%83%BC%E3%82%92&text=Google%20Cloud%20%E3%82%B3%E3%83%B3%E3%82%BD%E3%83%BC%E3%83%AB%E3%81%A7%E3%80%81%5B%E8%AA%8D%E8%A8%BC,%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E7%A7%BB%E5%8B%95%E3%81%97%E3%81%BE%E3%81%99%E3%80%82&text=%5B%E8%AA%8D%E8%A8%BC%E6%83%85%E5%A0%B1%E3%81%AE%E4%BD%9C%E6%88%90%5D%20%E3%82%92,%E5%88%97%E3%81%8C%E8%A1%A8%E7%A4%BA%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99%E3%80%82 )

### VOICEVOXのダウンロード
[VOICEVOXホームページ](https://voicevox.hiroshiba.jp/)からダウンロードする

### .envの作成
+ .envファイルを作成する
```
REACT_APP_GOOGLE_STREETVIEW_API_KEY="YOUR GOOGLE STREETVIEW API KEY"
REACT_APP_GOOGLE_RECOGNITION_API_KEY="YOUR GOOGLE RECOGNITION API KEY"
REACT_APP_BACKEND_API_SERVER_URL="BACKEND SERVER URL"
REACT_APP_VOICEVOX_ENDPOINT_URL="VOICEVOX ENDPOINT URL"
```
+ YOUR GOOGLE STREETVIEW API KEYとYOUR GOOGLE RECOGNITION API KEYを自分のAPIキーに変更する
+ BACKEND SERVER URLをバックエンドサーバーのURLに変更する
+ VOICEVOX ENDPOINT URLをVOICEVOXのURLに変更する
  + デフォルトはhttp://localhost:50021

### ローカルサーバの立ち上げ
+ バックエンドサーバーとVOICEVOXを起動する
+ ターミナルでfrontの階層まで移動する
+ ```npm start```を実行する


## page 
+ Home.jsx
+ Setting.jsx
  + 行先の設定など
+ Destination.jsx
  + マップにピンを打ってもらい、ユーザがどこの旅をしたいか取得
+ Select_plan.jsx
  + ユーザからのピン情報から経路を３つ推薦
+ Route_rec.jsx
  + ユーザからの位置情報をもとに経路推薦
+ 以降追加する画面
  + ロード画面
  + 観光地案内画面

## task
+ 全体を通して、CSSを当てる
+ Destination.jsx
  + クリック位置のピンの作成
    + 現状クリックするとコンソールに緯度経度が表示されるが、画面上には何も表示されない。
    + クリックした場所がどこかわかるように示したい
+ Setting.jsx
  + 名前の保存・APIに投げる
+ Select_plan.jsx
  + まだAPIからデータを受け取れていなため特に何もしていない。
+ Route_rec.jsx
  + もらった地点からどのように経路の出力部分の作成
    + 参考：https://qiita.com/kekishida/items/c09dbbcbbfeb74a57759

## 参考資料
+ Unity
  + [ChatDollKit GitHub](https://github.com/uezo/ChatdollKit/blob/master/README.ja.md)
  + [Uni Task GitHub](https://github.com/Cysharp/UniTask)
  + [uLipSync GitHub](https://github.com/hecomi/uLipSync)
  + [uLipSyncWebGL GitHub](https://github.com/uezo/uLipSyncWebGL)
  + [Qiita：ChatdollKitとChatGPTで対話アバターを作成する](https://qiita.com/ayakaintheclouds/items/9649745586323edb83e2)
  + [Qiita：ChatdollKitで作った対話アバターをwebブラウザ上で動作させる方法](https://qiita.com/ayakaintheclouds/items/f06cab1e936e6cdecebf)
  + [React Unity WebGL](https://react-unity-webgl.dev/)
  + [Communication from React to Unity](https://react-unity-webgl.dev/docs/api/send-message)
  + [Communication from Unity to React](https://react-unity-webgl.dev/docs/api/event-system)
  + [Qiita：ChatdollKitとChatmemoryを連携させて記憶を保持するバーチャル嫁に進化させてみた](https://qiita.com/hexanitrobenzen/items/df45684f5a9d51d7f367)
