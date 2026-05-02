import { ReviewsService } from './reviews.service';
declare class CreateReviewDto {
    bookId: string;
    rating: number;
    comment: string;
}
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    likeReview(id: string): Promise<import("mongoose").Document<unknown, {}, import("./review.schema").ReviewDocument, {}, {}> & import("./review.schema").Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    dislikeReview(id: string): Promise<import("mongoose").Document<unknown, {}, import("./review.schema").ReviewDocument, {}, {}> & import("./review.schema").Review & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByBook(bookId: string): Promise<import("./review.schema").Review[]>;
    create(dto: CreateReviewDto, req: any): Promise<import("./review.schema").Review>;
}
export {};
