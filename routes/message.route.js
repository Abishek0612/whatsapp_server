import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import trimRequest from "trim-request";
import { sendMessage, getMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/").post(trimRequest.all, authMiddleware, sendMessage);
router.route("/:convo_id").get(trimRequest.all, authMiddleware, getMessage);

export default router;
