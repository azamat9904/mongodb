import { body, param } from "express-validator";

export const isNotEmpty = (fields: string[]):any => {
    const getValidatorResult = (fieldName: string) => body(fieldName).not().isEmpty().withMessage("Поле не может быть пустым");
    return fields.map(getValidatorResult)
};

export const isNotEmptyParam = (field: string) => param(field).not().isEmpty().withMessage("Отсутствет нужный параметр");

export const fieldMinLength = (fields: string[], min: number) => {
    const getValidatorResult = (fieldName: string) => body(fieldName).isLength({ min }).withMessage(`Длина поле ${fieldName} должна быть больше ${min} символов`);
    return fields.map((fieldName: string) => getValidatorResult(fieldName));
};

