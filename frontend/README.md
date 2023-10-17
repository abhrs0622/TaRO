# TaRO frontend

## インストール関連
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
