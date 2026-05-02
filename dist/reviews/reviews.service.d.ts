import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { BookDocument } from '../books/book.schema';
export declare class ReviewsService {
    private reviewModel;
    private bookModel;
    constructor(reviewModel: Model<ReviewDocument>, bookModel: Model<BookDocument>);
    findByBook(bookId: string): Promise<Review[]>;
    likeReview(reviewId: string): Promise<import("mongoose").Document<unknown, {}, ReviewDocument, {}, {}> & Review & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    dislikeReview(reviewId: string): Promise<import("mongoose").Document<unknown, {}, ReviewDocument, {}, {}> & Review & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(bookId: string, userId: string, userName: string, rating: number, comment: string): Promise<Review>;
}
