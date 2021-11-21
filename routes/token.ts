import express from "express";
import tokenController from "../controllers/token";
import { isNotEmpty, isNotEmptyParam} from "../validators";

const router = express.Router();

router.get("/all", tokenController.getTokens);
router.get("/byUserName", tokenController.getTokensByUserName);
router.post("/", isNotEmpty(["name"]), tokenController.createToken);
router.delete("/:id", isNotEmptyParam("id"), tokenController.deleteToken);
router.put("/:id", isNotEmptyParam("id"), tokenController.updateToken);

export  default  router;
