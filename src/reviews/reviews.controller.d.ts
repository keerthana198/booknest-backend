import { ReviewsService } from './reviews.service';
declare class CreateReviewDto {
    bookId: string;
    rating: number;
    comment: string;
}
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    findByBook(bookId: string): Promise<import("./review.schema").Review[]>;
    create(dto: CreateReviewDto, req: any): Promise<import("./review.schema").Review>;
}
export {};
