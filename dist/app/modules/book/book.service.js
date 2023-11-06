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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const pagintionHelpers_1 = require("../../helpers/pagintionHelpers");
const book_constant_1 = require("./book.constant");
const book_model_1 = require("./book.model");
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const createBook = yield book_model_1.Book.create(book);
    return createBook;
});
const getBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(paginationOptions, 'paginationOptions');
    console.log(filters, 'i am from service to check filters');
    const { skip, limit, page, sortBy, sortOrder } = yield pagintionHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const { query } = filters, filtersData = __rest(filters, ["query"]);
    console.log(query, 'i am from service to check query');
    console.log(filtersData, 'i am from service to check filetersData');
    const andCondition = [];
    if (query) {
        andCondition.push({
            $or: book_constant_1.bookSearchableField.map(field => ({
                [field]: {
                    $regex: query,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                if (field === 'publicationYear') {
                    console.log('i have in if logic');
                    return {
                        PublicationDate: {
                            $gte: new Date(`${value}-01-01T00:00:00.000Z`),
                            $lt: new Date(`${parseInt(value) + 1}-01-01T00:00:00.000Z`),
                        },
                    };
                }
                else if (field === 'minPrice') {
                    const parsingMinPrice = parseInt(value);
                    return { price: { $lt: parsingMinPrice } };
                }
                else if (field === 'maxPrice') {
                    const parsingMaxPrice = parseInt(value);
                    return { price: { $gt: parsingMaxPrice } };
                }
                return { [field]: { $regex: value, $options: 'i' } };
            }),
        });
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    console.log(sortCondition, 'to check sort condition');
    const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
    console.log('sortCondition', sortCondition);
    const result = yield book_model_1.Book.find(whereConditions).sort(sortCondition).skip(skip);
    const count = yield book_model_1.Book.countDocuments();
    if (andCondition.length > 0) {
        return {
            meta: {
                page,
                limit,
                count,
            },
            data: result,
        };
    }
    else {
        return {
            meta: {
                page,
                limit,
                count,
            },
            data: result,
        };
    }
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getBook = yield book_model_1.Book.findById(id);
    return getBook;
});
const updateBookReveiw = (id, review) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBook = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $push: { reviews: review } }, { returnOriginal: false });
    return updateBook;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBook = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return updateBook;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findByIdAndDelete(id);
    return result;
});
exports.BookService = {
    createBook,
    getBooks,
    getSingleBook,
    updateBookReveiw,
    updateBook,
    deleteBook,
};
