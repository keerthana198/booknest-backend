import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  coverImage: string;

  @Prop()
  description: string;

  @Prop()
  authorBio: string;

  @Prop()
  storyOutline: string;
  
  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop([String])
  genres: string[];

  @Prop()
  publishedYear: number;

  @Prop()
  isbn: string;

  @Prop({ default: false })
  isSuggested: boolean;

  @Prop({ default: false })
  isPopular: boolean;

  @Prop({ default: false })
  isTopRated: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
