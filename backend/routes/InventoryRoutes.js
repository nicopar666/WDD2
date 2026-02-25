import express from 'express';
const router = express.Router();
import { getInventory, addProduct } from '../controller/InventoryController.js';

// GET /api/inventory - Get all inventory items
router.get('/', getInventory);

// POST /api/inventory - Add a new product
router.post('/', addProduct);

export default router;
