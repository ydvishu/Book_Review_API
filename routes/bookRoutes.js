import express from 'express';
import { createBook, getAllBooks, searchBooks, getBookById } from '../controllers/bookController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createBook); // protected route
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

export default router;
