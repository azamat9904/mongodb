import { Schema, Model, model, Document } from "mongoose";

export interface IToken extends Document {
    name: string,
    token: string
}

const schema = new Schema<IToken, Model<IToken>>({
    name: { type: String, required: true },
    token: {type: String, required: true }
});

export const TokenModel: Model<IToken> = model("Token", schema)

