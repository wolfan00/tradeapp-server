import express from 'express';
const router = express.Router();

import  createRefreshToken  from '../controller/refreshController.js';

router.post('/', createRefreshToken)

export default router;