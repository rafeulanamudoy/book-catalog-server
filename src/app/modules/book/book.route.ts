import express from 'express'
import { BookController } from './book.controller'

const router = express.Router()

export const BookRoutes = router

router.post('/', BookController.createBook)
