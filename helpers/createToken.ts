import jwt from "jsonwebtoken";
import configs from "../config";

export const createJwtToken = (tokenInfo: any) => {
    return new Promise((resolve, reject) => {
        jwt.sign(tokenInfo, configs.JWT_SECRET, (error: any, token: any) => {
            if(error) reject(error);
            resolve(token);
        })
    })
}
