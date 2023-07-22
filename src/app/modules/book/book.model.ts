import { Schema, model } from 'mongoose'
import { IBook } from './book.interface'
const statusLabel = ['In Stock', 'Out Of Stock']
const bookSchema = new Schema<IBook>({
  Title: {
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
  status: {
    type: String,
    required: true,
    enum: statusLabel,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  copies: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [String],
  },
})

export const Book = model<IBook>('Book', bookSchema)
