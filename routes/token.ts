import express from "express";
import tokenController from "../controllers/token";

const router = express.Router();

router.get("/all", tokenController.getTokens);
router.get("/byUserName", tokenController.getTokensByUserName);
router.post("/", tokenController.createToken);
router.delete("/:id", tokenController.deleteToken);
router.put("/:id", tokenController.updateToken);

export  default  router;
