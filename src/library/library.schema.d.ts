import { Document, Types } from 'mongoose';
export type LibraryEntryDocument = LibraryEntry & Document;
export declare enum ReadStatus {
    READING = "Reading",
    COMPLETED = "Completed",
    WANT_TO_READ = "Want to Read"
}
export declare class LibraryEntry {
    user: Types.ObjectId;
    book: Types.ObjectId;
    status: ReadStatus;
}
export declare const LibraryEntrySchema: import("mongoose").Schema<LibraryEntry, import("mongoose").Model<LibraryEntry, any, any, any, Document<unknown, any, LibraryEntry, any, {}> & LibraryEntry & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LibraryEntry, Document<unknown, {}, import("mongoose").FlatRecord<LibraryEntry>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<LibraryEntry> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
