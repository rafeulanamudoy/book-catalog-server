import { IBook } from './book.interface'
import { Book } from './book.model'

const createBook = async (book: IBook): Promise<IBook | null> => {
  const createBook = await Book.create(book)
  return createBook
}

export const BookService = {
  createBook,
}
