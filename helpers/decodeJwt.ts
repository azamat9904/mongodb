import jwt from "jsonwebtoken";
import configs from "../config";

export const decodeJwt = (token: any) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, configs.JWT_SECRET, (error: any, decoded: any) => {
            if(error) reject(error);
            resolve(decoded);
        })
    });
}