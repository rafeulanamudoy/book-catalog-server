"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const book_model_1 = require("../modules/book/book.model");
const calculatePagination = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const defaultLimit = yield book_model_1.Book.find({}).count();
    const page = Number(options.page || 1);
    const limit = Number(options.limit || defaultLimit);
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    const skip = (page - 1) * limit;
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
});
exports.paginationHelpers = {
    calculatePagination,
};
