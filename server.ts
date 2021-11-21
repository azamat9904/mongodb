import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import accountRoutes from "./routes/account";
import tokenRoutes from "./routes/token";
import { initDb } from "./services/db";

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

// App route handlers
app.use("/account", accountRoutes);
app.use("/token", tokenRoutes);

initDb().then(() => {
    app.listen(PORT);
}).catch(error => {
    console.error("Не удалось запустить сервер: ", error);
})
