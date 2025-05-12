import express from 'express';
const router = express.Router();

import { getCategories,getCategoriesById } from '../controller/categoryController.js';

router.get('/', getCategories);
router.get('/:id',getCategoriesById);

export default router;