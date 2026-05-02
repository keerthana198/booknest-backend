import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LibraryEntryDocument = LibraryEntry & Document;

export enum ReadStatus {
  READING = 'Reading',
  COMPLETED = 'Completed',
  WANT_TO_READ = 'Want to Read',
}

@Schema({ timestamps: true })
export class LibraryEntry {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  book: Types.ObjectId;

  @Prop({ enum: ReadStatus, default: ReadStatus.WANT_TO_READ })
  status: ReadStatus;
}

export const LibraryEntrySchema = SchemaFactory.createForClass(LibraryEntry);
