import { Schema, model, Model, Document } from "mongoose";

export interface IAccount extends Document{
    id: string,
    name: string,
    surname: string,
    age: number,
    isAdmin: boolean
}


const schema: Schema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true},
    isAdmin: { type: Boolean, default: false}
});

export const AccountModel: Model<IAccount> = model("Account", schema);