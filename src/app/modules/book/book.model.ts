import { Schema, model } from 'mongoose'
import { IBook } from './book.interface'

const UserReveiw = {
  email: String,
  reveiw: String,
}

const bookSchema = new Schema<IBook>({
  Title: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  PublicationDate: {
    type: Date,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },

  reviews: {
    type: [UserReveiw],
    default: [],
  },
})

export const Book = model<IBook>('Book', bookSchema)
