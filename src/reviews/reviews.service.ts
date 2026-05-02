import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { InjectModel as InjectBookModel } from '@nestjs/mongoose';
import { Book, BookDocument } from '../books/book.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  async findByBook(bookId: string): Promise<Review[]> {
    return this.reviewModel
      .find({ book: new Types.ObjectId(bookId) })
      .sort({ createdAt: -1 })
      .exec();
  }
  async likeReview(reviewId: string) {
    return this.reviewModel.findByIdAndUpdate(
      reviewId,
      { $inc: { likes: 1 } },
      { new: true },
    );
  }

  async dislikeReview(reviewId: string) {
    return this.reviewModel.findByIdAndUpdate(
      reviewId,
      { $inc: { dislikes: 1 } },
      { new: true },
    );
  }
  async create(
    bookId: string,
    userId: string,
    userName: string,
    rating: number,
    comment: string,
  ): Promise<Review> {
    const review = new this.reviewModel({
      book: new Types.ObjectId(bookId),
      user: new Types.ObjectId(userId),
      userName,
      rating,
      comment,
    });
    await review.save();

    // Update book rating average
    const reviews = await this.reviewModel.find({
      book: new Types.ObjectId(bookId),
    });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await this.bookModel.findByIdAndUpdate(bookId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
    });

    return review;
  }

}
