Midterm_snake
===
## project名稱

JOJO's Snake

## 簡介

利用既有貪食蛇框架發展計分功能


使用/操作方式
---
```gherkin=
git clone git@github.com:b04502133/midterm_snake.git
cd midterm_snake
```
* SERVER設定
```gherkin=
vim backend/.env 
```
將.env檔內之DB更改為個人之mongodb URL
* 安裝設定
```gherkin=
cd backend && npm install 
cd client && npm install 
cd .. && npm run dev
```
* 操作說明
    1. 打入姓名
    2. 按下start鍵
    3. 利用鍵盤之上下左右操控蛇之方向
    4. 觀看右方之Top 10排行
    5. 按下start鍵重啟遊戲



## 使用與參考之框架/模組/原始碼

1. [React](https://reactjs.org/)
2. [Node](https://nodejs.org/en/)
4. [Snake](https://github.com/taming-the-state-in-react/react-snake) : 使用貪食蛇之框架延伸功能

## 我的貢獻
1. 增加玩家名稱
2. 使遊戲能再次啟動
3. 計每局得分
4. 計算Top 10排行榜
     
    
## 心得
這次起手時乾愣了三天不知該如何下手，到最後原本
打算使用socket.io實作讓多人同時進入遊戲的功能
就無法完成，也沒有完善css讓整體較美觀。
但因為這次的練習對於Node.js及React.js有了小小小小的認識
，期末勢必要提早開始！