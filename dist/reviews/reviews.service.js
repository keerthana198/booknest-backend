"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_schema_1 = require("./review.schema");
const book_schema_1 = require("../books/book.schema");
let ReviewsService = class ReviewsService {
    constructor(reviewModel, bookModel) {
        this.reviewModel = reviewModel;
        this.bookModel = bookModel;
    }
    async findByBook(bookId) {
        return this.reviewModel
            .find({ book: new mongoose_2.Types.ObjectId(bookId) })
            .sort({ createdAt: -1 })
            .exec();
    }
    async likeReview(reviewId) {
        return this.reviewModel.findByIdAndUpdate(reviewId, { $inc: { likes: 1 } }, { new: true });
    }
    async dislikeReview(reviewId) {
        return this.reviewModel.findByIdAndUpdate(reviewId, { $inc: { dislikes: 1 } }, { new: true });
    }
    async create(bookId, userId, userName, rating, comment) {
        const review = new this.reviewModel({
            book: new mongoose_2.Types.ObjectId(bookId),
            user: new mongoose_2.Types.ObjectId(userId),
            userName,
            rating,
            comment,
        });
        await review.save();
        const reviews = await this.reviewModel.find({
            book: new mongoose_2.Types.ObjectId(bookId),
        });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await this.bookModel.findByIdAndUpdate(bookId, {
            rating: Math.round(avgRating * 10) / 10,
            reviewCount: reviews.length,
        });
        return review;
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(1, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map