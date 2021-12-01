import { Request, Response } from "express";
import { AccountModel, IAccount } from "../models/account";
import { validationResult } from "express-validator";

const helloWorld = () => console.log("Hello world");

const helloEwak = () => console.log("ewak")


const getAccounts = async (req: Request, res: Response) => {
    try{
        const allAccounts = await AccountModel.find({}).select("_id name surname age isAdmin");
        res.json({
            message: "Получение списка аккаунтов успешно выполнено",
            data: allAccounts
        });
    }catch(error){
        res.status(500).json({
            message: "Не удалось загрузить список аккаунтов",
            error: error
        });
    }
}

const createAccount = async (req: Request, res: Response) => {
    try{
        // Как можно избавиться от такого повтора кода ??
        //////////////////////////////////////////////////////
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Не удалось создать аккаунт",
                error: errors.array()
            });
        }
        //////////////////////////////////////////////////////

        const accountBody: IAccount = req.body;
        const account: IAccount = new AccountModel({ ...accountBody });
        await account.save();

        res.json({
            message: "Аккаунт успешно создано",
            data: {
                _id: account._id,
                name: account.name,
                surname: account.surname,
                age: account.age,
                isAdmin: account.isAdmin
            }
        });
    }catch(error){
        res.status(402).json({
            message: "Не удалось создать аккаунт",
            error: error
        });
    }
}

const updateAccount = async (req: Request, res: Response) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Не удалось обновить аккаунт",
                error: errors.array()
            });
        }

        const accountId = req.params.id;
        const updatedAccountBody = req.body;
        const updatedAccount = await AccountModel.findOneAndUpdate({ _id: accountId }, updatedAccountBody, {new: true});
        res.json({
            message: "Данные успешно обновились",
            data: updatedAccount
        })
    }catch(error){
        res.status(500).json({
            message: "Не удалось обновить данные",
            error: error
        })
    }

}

const deleteAccount = async (req: Request, res: Response) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "Не удалось удалить аккаунт",
                error: errors.array()
            });
        }

        const accountId = req.params.id;
        const deletedAccount = await AccountModel.findOneAndDelete({_id: accountId});
        res.json({
            message: "Запись успешно удалена",
            data: deletedAccount
        })
    }catch(error){
        res.status(500).json({
            message: "Не удалось удалить аккаунт",
            error: error
        })
    }
}

export default  { getAccounts, createAccount, updateAccount, deleteAccount };