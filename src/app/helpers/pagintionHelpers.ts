import { SortOrder } from 'mongoose'
import { Book } from '../modules/book/book.model'

type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}
type IOptionResult = {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: SortOrder
  skip: number
}

const calculatePagination = async (
  options: IOptions
): Promise<IOptionResult> => {
  const defaultLimit = await Book.find({}).count()
  const page = Number(options.page || 1)
  const limit = Number(options.limit || defaultLimit)
  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'
  const skip = (page - 1) * limit
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}

export const paginationHelpers = {
  calculatePagination,
}
