import { Request, Response, NextFunction} from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] ?? null;

    if(!token){
        return res.status(401).json({
            message: "Вы не авторизованы",
            error: null
        });
    }

    next();
}