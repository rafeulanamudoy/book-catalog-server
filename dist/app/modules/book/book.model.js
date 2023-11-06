"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const UserReveiw = {
    email: String,
    reveiw: String,
};
const bookSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
