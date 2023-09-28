import httpStatus from 'http-status'
import catchAsync from '../../shared/catchAsync'
import { Request, Response } from 'express'
import sendResponse from '../../shared/sendResponse'
import { BookService } from './book.service'
import pick from '../../shared/pick'
import { paginationFileds } from '../../../constants/pagination'
import { bookFilterableField } from './book.constant'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body

  const result = await BookService.createBook(book)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Book created successfully',
    data: result,
  })
})
const getBooks = catchAsync(async (req: Request, res: Response) => {
  //console.log('query check', req.query)
  const paginationOptions = pick(req.query, paginationFileds)
  const filters = pick(req.query, bookFilterableField)
  const result = await BookService.getBooks(filters, paginationOptions)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Book Get successfully',
    data: result,
  })
})

export const BookController = {
  createBook,
  getBooks,
}
