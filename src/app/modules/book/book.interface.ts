type IStatus = 'In Stock' | 'Out Of Stock'

export type IBook = {
  Title: string
  Author: string
  Genre: string
  PublicationDate: Date
  Image: string
  status: IStatus
  rating: number
  price: number
  copies: number
  reviews?: string[]
}
export type IBookFilters = {
  query?: string
}
