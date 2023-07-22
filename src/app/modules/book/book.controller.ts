import httpStatus from 'http-status'
import catchAsync from '../../shared/catchAsync'
import { Request, Response } from 'express'
import sendResponse from '../../shared/sendResponse'
import { BookService } from './book.service'

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

export const BookController = {
  createBook,
}
