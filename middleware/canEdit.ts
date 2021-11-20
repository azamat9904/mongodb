import { Request, Response, NextFunction} from "express";
import {decodeJwt} from "../helpers/decodeJwt";

export const canEdit = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] ?? null;
    const accountData: any = await decodeJwt(token);

    if(!accountData.isAdmin){
        return res.status(403).json({
            message: "У вас нет доступа для этой операции",
            error: null
        })
    }

    next();
}