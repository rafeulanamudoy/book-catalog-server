import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../helpers/pagintionHelpers'
import { IGenericResponse } from '../../interface/common'
import { IpaginationOptions } from '../../interface/pagination'
import { bookSearchableField } from './book.constant'
import { IBook, IBookFilters } from './book.interface'
import { Book } from './book.model'

const createBook = async (book: IBook): Promise<IBook | null> => {
  const createBook = await Book.create(book)
  return createBook
}
const getBooks = async (
  filters: IBookFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  console.log(paginationOptions, 'paginationOptions')
  console.log(filters, 'i am from service to check filters')
  const { skip, limit, page, sortBy, sortOrder } =
    await paginationHelpers.calculatePagination(paginationOptions)

  const { query, ...filtersData } = filters

  console.log(query, 'i am from service to check query')
  console.log(filtersData, 'i am from service to check filetersData')

  const andCondition = []
  if (query) {
    andCondition.push({
      $or: bookSearchableField.map(field => ({
        [field]: {
          $regex: query,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === 'publicationYear') {
          console.log('i have in if logic')
          return {
            PublicationDate: {
              $gte: new Date(`${value}-01-01T00:00:00.000Z`),
              $lt: new Date(
                `${parseInt(value as string) + 1}-01-01T00:00:00.000Z`
              ),
            },
          }
        } else if (field === 'minPrice') {
          const parsingMinPrice = parseInt(value as string)
          return { price: { $lt: parsingMinPrice } }
        } else if (field === 'maxPrice') {
          const parsingMaxPrice = parseInt(value as string)
          return { price: { $gt: parsingMaxPrice } }
        }
        return { [field]: { $regex: value as string, $options: 'i' } }
      }),
    })
  }
  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  console.log(sortCondition, 'to check sort condition')
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}
  console.log('sortCondition', sortCondition)
  const result = await Book.find(whereConditions).sort(sortCondition).skip(skip)

  const count = await Book.countDocuments()
  if (andCondition.length > 0) {
    return {
      meta: {
        page,
        limit,
        count,
      },
      data: result,
    }
  } else {
    return {
      meta: {
        page,
        limit,
        count,
      },
      data: result,
    }
  }
}

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const getBook = await Book.findById(id)
  return getBook
}

const updateBookReveiw = async (
  id: string,
  review: { email: string; reveiw: string }
): Promise<IBook | null> => {
  const updateBook = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: review } },
    { returnOriginal: false }
  )
  return updateBook
}
export const BookService = {
  createBook,
  getBooks,
  getSingleBook,
  updateBookReveiw,
}
