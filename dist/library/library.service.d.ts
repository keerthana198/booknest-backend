import { Model, Types } from 'mongoose';
import { LibraryEntry, LibraryEntryDocument, ReadStatus } from './library.schema';
export declare class LibraryService {
    private libraryModel;
    constructor(libraryModel: Model<LibraryEntryDocument>);
    getMyLibrary(userId: string): Promise<LibraryEntry[]>;
    addToLibrary(userId: string, bookId: string, status: ReadStatus): Promise<import("mongoose").Document<unknown, {}, LibraryEntryDocument, {}, {}> & LibraryEntry & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateStatus(userId: string, bookId: string, status: ReadStatus): Promise<import("mongoose").Document<unknown, {}, LibraryEntryDocument, {}, {}> & LibraryEntry & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    removeFromLibrary(userId: string, bookId: string): Promise<import("mongoose").Document<unknown, {}, LibraryEntryDocument, {}, {}> & LibraryEntry & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
