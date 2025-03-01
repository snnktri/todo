import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    credentials: true,
    allowedHeaders: [ 'Authorization', 'Content-Type']
}));

app.use(express.json({
    extended: true,
    limit: '50mb'
}));

app.use(express.urlencoded(
    { extended: true, limit: '50mb' }
));

app.use(express.static("public"));

app.use(cookieParser());

// routes goes here


export { app };