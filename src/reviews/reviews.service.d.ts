import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { BookDocument } from '../books/book.schema';
export declare class ReviewsService {
    private reviewModel;
    private bookModel;
    constructor(reviewModel: Model<ReviewDocument>, bookModel: Model<BookDocument>);
    findByBook(bookId: string): Promise<Review[]>;
    create(bookId: string, userId: string, userName: string, rating: number, comment: string): Promise<Review>;
}
