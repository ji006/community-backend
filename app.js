import cors from 'cors';

let corsOptions = {
  origin: '*',      // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
}


// express 모듈을 불러옵니다.
import express from 'express';
// express 애플리케이션을 생성합니다.
const app = express();
// 웹 서버가 사용할 포트 번호를 정의합니다.
const port = 8081;

import path from 'path';
const __dirname = path.resolve();

// app.use('/community', express.static(__dirname+'/community'));


app.use(cors(corsOptions));

app.use(express.json()); //json방식

import postRoute from './routes/post_route.js'
app.use("/posts",postRoute)

import userRoute from './routes/user_route.js'
app.use("/users",userRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});