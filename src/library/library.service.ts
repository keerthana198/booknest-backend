import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LibraryEntry, LibraryEntryDocument, ReadStatus } from './library.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(LibraryEntry.name)
    private libraryModel: Model<LibraryEntryDocument>,
  ) {}

  async getMyLibrary(userId: string): Promise<LibraryEntry[]> {
    return this.libraryModel
      .find({ user: new Types.ObjectId(userId) })
      .populate('book')
      .sort({ updatedAt: -1 })
      .exec();
  }

  async addToLibrary(userId: string, bookId: string, status: ReadStatus) {
    const existing = await this.libraryModel.findOne({
      user: new Types.ObjectId(userId),
      book: new Types.ObjectId(bookId),
    });

    if (existing) {
      existing.status = status;
      return existing.save();
    }

    const entry = new this.libraryModel({
      user: new Types.ObjectId(userId),
      book: new Types.ObjectId(bookId),
      status,
    });
    return entry.save();
  }

  async updateStatus(userId: string, bookId: string, status: ReadStatus) {
    return this.libraryModel
      .findOneAndUpdate(
        { user: new Types.ObjectId(userId), book: new Types.ObjectId(bookId) },
        { status },
        { new: true },
      )
      .populate('book')
      .exec();
  }

  async removeFromLibrary(userId: string, bookId: string) {
    return this.libraryModel
      .findOneAndDelete({
        user: new Types.ObjectId(userId),
        book: new Types.ObjectId(bookId),
      })
      .exec();
  }
}
