import express from "express";
import accountController from "../controllers/account";
import { auth } from "../middleware/isAuth";
import { canEdit } from "../middleware/canEdit";
import { isNotEmpty, fieldMinLength, isNotEmptyParam } from "../validators";

const router = express.Router();

router.get("/",  accountController.getAccounts);
router.put("/:id", isNotEmptyParam("id"), accountController.updateAccount);
router.delete('/:id', auth, canEdit, isNotEmptyParam("id"), accountController.deleteAccount);
router.post("/",
    isNotEmpty(["name", "surname", "age", "isAdmin"]),
    fieldMinLength(["name", "surname"], 5),
    accountController.createAccount
);

export default  router;