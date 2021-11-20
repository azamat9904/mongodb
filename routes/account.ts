import express from "express";
import accountController from "../controllers/account";
import { auth } from "../middleware/isAuth";
import { canEdit } from "../middleware/canEdit";

const router = express.Router();

router.get("/", accountController.getAccounts);
router.post("/", accountController.createAccount);
router.put("/:id", accountController.updateAccount);
router.delete('/:id', auth, canEdit, accountController.deleteAccount);

export default  router;