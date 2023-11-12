import express from 'express';
import { searchUsers } from '../controllers/user.controllers.js';
import trimRequest from 'trim-request'
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(trimRequest.all, authMiddleware, searchUsers)


export default router  

