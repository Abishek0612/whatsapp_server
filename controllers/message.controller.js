import { populate } from "dotenv";
import logger from "../configs/logger.js";
import { createMessage, getConvoMessages, populateMessage } from "../services/message.service.js";
import { updateLatestMessage } from "../services/conversation.service.js";

export const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user.userId; //userId from authmiddlewear
    const { message, convo_id, files } = req.body;
    if (!convo_id || (!message && !files)) {
      logger.error("Please provider a conversation id and a message body");
      return res.sendStatus(400);
    }

    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };

    let newMessage = await createMessage(msgData);
    let populatedMessage = await populateMessage(newMessage._id);
    await updateLatestMessage(convo_id, newMessage); //updateLatestMessage coming from conversation.service.js
    res.json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const convo_id = req.params.convo_id;
    if (!convo_id) {
      logger.error("Please add a conversation id in params");
      res.sendStatus(400);
    }
    const message = await getConvoMessages(convo_id)
    res.json(message)
  } catch (error) {
    next(error);
  }
};
