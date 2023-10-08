type UserReveiw = {
  email: string
  reveiw: string
}

export type IBook = {
  Title: string
  Email: string
  Author: string
  Genre: string
  PublicationDate: Date
  Image: string

  reviews?: UserReveiw[]
}
export type IBookFilters = {
  query?: string
}
