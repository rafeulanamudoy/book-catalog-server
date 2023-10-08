import express from 'express'
import { BookController } from './book.controller'

const router = express.Router()

export const BookRoutes = router
router.get('/:id', BookController.getSingleBook)
router.post('/', BookController.createBook)
router.get('/', BookController.getBooks)
