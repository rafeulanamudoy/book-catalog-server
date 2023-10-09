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
  console.log('query check', req.query)
  console.log(typeof req.query.publicationYear)
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

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  console.log(id)
  const result = await BookService.getSingleBook(id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Single Book Get successfully',
    data: result,
  })
})
const updateBookReveiw = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const review = req.body.review
  console.log('id', id)
  console.log('review', review)
  const result = await BookService.updateBookReveiw(id, review)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'update Review  successfully',
    data: result,
  })
})

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateData = req.body
  console.log('id', id)
  console.log('updateBook Data', updateData)
  const result = await BookService.updateBook(id, updateData)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'update  Book  successfully',
    data: result,
  })
})
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  console.log('id', id)

  const result = await BookService.deleteBook(id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'book  deleted  successfully',
    data: result,
  })
})
export const BookController = {
  createBook,
  getBooks,
  getSingleBook,
  updateBookReveiw,
  updateBook,
  deleteBook,
}
