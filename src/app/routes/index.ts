import express from 'express'
import { BookRoutes } from '../modules/book/book.route'
import { UserRoutes } from '../modules/auth/auth.route'

const router = express.Router()

const mouduleRoutes = [
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
]

mouduleRoutes.forEach(route => router.use(route.path, route.route))

export const routes = router
//app.use('/api/v1/users/', usersRouter)
