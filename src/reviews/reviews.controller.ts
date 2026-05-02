import {
  Controller,
  Patch,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IsNumber, IsString, Min, Max } from 'class-validator';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateReviewDto {
  @IsString()
  bookId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;
}

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Patch(':id/like')
  likeReview(@Param('id') id: string) {
    return this.reviewsService.likeReview(id);
  }

  @Patch(':id/dislike')
  dislikeReview(@Param('id') id: string) {
    return this.reviewsService.dislikeReview(id);
  }
  @Get('book/:bookId')
  findByBook(@Param('bookId') bookId: string) {
    return this.reviewsService.findByBook(bookId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateReviewDto, @Request() req) {
    return this.reviewsService.create(
      dto.bookId,
      req.user.userId,
      req.user.name,
      dto.rating,
      dto.comment,
    );
  }
}