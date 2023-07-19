import httpStatus from 'http-status'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { Request, Response } from 'express'
import { BookService } from './book.service'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body

  const result = await BookService.createBook()
  // eslint-disable-next-line no-unused-vars
  //   if (result !== null) {
  //     // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  //     const { password, ...others } = result
  //     console.log(result)

  //     sendResponse(res, {
  //       success: true,
  //       statusCode: httpStatus.OK,

  //       message: 'Book created successfully',
  //       data: others,
  //     })
  //   }
})

export const BookController = {
  createBook,
}
