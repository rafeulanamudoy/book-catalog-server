"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const book_route_1 = require("../modules/book/book.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = express_1.default.Router();
const mouduleRoutes = [
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.UserRoutes,
    },
];
mouduleRoutes.forEach(route => router.use(route.path, route.route));
exports.routes = router;
//app.use('/api/v1/users/', usersRouter)
