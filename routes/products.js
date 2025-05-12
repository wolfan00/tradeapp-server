import express from 'express';
const router = express.Router();
import {auth} from '../middleware/auth.js';

import{
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/productsController.js';

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/',auth, createProduct);

router.put('/:id',auth, updateProduct);

router.delete('/:id',auth, deleteProduct);

export default router;
