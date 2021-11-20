import mongoose from "mongoose";
import configs from "../config";

export const initDb = () => mongoose.connect(configs.DB_URL);
