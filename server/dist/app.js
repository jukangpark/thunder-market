"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const isHeroku = process.env.NODE_ENV === "production";
// 이 NODE_ENV 는 heroku에 정의되어 있다.
(() => {
    if (isHeroku)
        return; // 해로쿠 환경에서는 이 즉시 실행함수가 실행되지 않도록 막는다.
    const result = dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", ".env") });
    // .env 파일의 경로를 dotenv.config 에 넘겨주고 성공여부를 저장함.
    if (result.parsed == undefined)
        // .env 파일 parsing 성공 여부 확인
        throw new Error("Cannot loaded environment variables file."); // parsing 실패시 Throwing
})();
require("./db");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apiRouter_1 = __importDefault(require("./routers/apiRouter"));
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const logger = (0, morgan_1.default)("dev");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 9000;
app.use(logger);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("build"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", apiRouter_1.default);
app.use("/product", productRouter_1.default);
app.use("/user", userRouter_1.default);
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/build/index.html");
});
app.get("*", (req, res) => {
    if (isHeroku) {
        res.sendFile(__dirname + "/build/index.html");
    }
    else {
        res.sendFile(process.cwd() + "/dist/build/index.html");
    }
});
app.listen(PORT, () => {
    console.log("hello world!");
});
// app.ts 를 실행시키려면 지금 타입스크립트로 작성이 되어 있기 때문에
// 자바스크립트로 변환을 해줘야 합니다.
// 자바스크립트로 트랜스파일링을 해줘야 하는데
// 그때 사용하는게 타입스크립트 컴파일러 입니다.
// tsc 명령어를 입력해주면
// 현재 폴더 아래에 있는 모든 ts 파일을
// 자바스크립트로 컴파일 해줍니다.
// ts-node app.ts 하면
// 서버를 실행해줌.
// npm run build 를 하면
// build 폴더에 리액트 코드를 html, css, js 파일로 변환을 해서 놓아줌.
