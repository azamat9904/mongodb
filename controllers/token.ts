import { Request, Response } from "express";
import { TokenModel } from "../models/token";
import { AccountModel } from "../models/account";
import { createJwtToken } from "../helpers/createToken";
import { validationResult } from "express-validator";

const getTokensByUserName = async (req: Request, res: Response) => {
    try{
        const name = req.body.name;
        const tokens = await TokenModel.find({ name}).select("name token");
        res.json({
            message: "Данные успешно загружены",
            data: tokens
        });
    }catch(error){
        res.status(500).json({
            message: "Не удалось загрузить токены аккаунта",
            error: error
        });
    }
}

const getTokens = async (req: Request, res: Response) => {
    try{
        const allTokens = await TokenModel.find({}).select("name token");
        res.json({
            message: "Получение списка токенов успешно выполнено",
            data: allTokens
        });
    }catch(error){
        res.status(500).json({
            message: "Не удалось загрузить список токенов",
            error: error
        });
    }
}

const createToken = async (req: Request, res: Response) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Не удалось создать токен",
                error: errors.array()
            });
        }

        const name: string = req.body.name;
        const account = await AccountModel.findOne({name: name});

        if(!account){
            res.status(404).json({
                message: "Не удалось найти такого пользователя",
                error: null
            });
            return;
        }

        const tokenData = {
            _id: account._id,
            name: account.name,
            surname: account.surname,
            isAdmin: account.isAdmin,
            age: account.age
        }

        const token = await createJwtToken(tokenData);
        const tokenModel = new TokenModel({ name, token });
        await tokenModel.save();

        res.json({
            message: "Токен успешно создано",
            data: {
                name: tokenModel.name,
                token: tokenModel.token
            }
        });
    }catch(error){
        res.status(402).json({
            message: "Не удалось создать токен",
            error: error
        });
    }
}

const updateToken = async (req: Request, res: Response) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Не удалось обновить токен",
                error: errors.array()
            });
        }

        const tokenId = req.params.id;
        const updatedAccountBody = req.body;
        const updatedToken = await TokenModel.findOneAndUpdate({ _id: tokenId }, updatedAccountBody, {new: true});
        res.json({
            message: "Данные успешно обновились",
            data: updatedToken
        })
    }catch(error){
        res.status(500).json({
            message: "Не удалось обновить данные",
            error: error
        })
    }
}

const deleteToken = async (req: Request, res: Response) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Не удалось удалить токен",
                error: errors
            });
        }

        const tokenId = req.params.id;
        const deletedToken = await TokenModel.findOneAndDelete({_id: tokenId});
        res.json({
            message: "Запись успешно удалена",
            data: deletedToken
        })
    }catch(error){
        res.status(500).json({
            message: "Не удалось удалить токен",
            error: error
        })
    }
}






export default  { getTokens, getTokensByUserName, createToken, updateToken, deleteToken };