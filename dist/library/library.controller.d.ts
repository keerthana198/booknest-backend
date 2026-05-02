import { LibraryService } from './library.service';
import { ReadStatus } from './library.schema';
export declare class LibraryController {
    private readonly libraryService;
    constructor(libraryService: LibraryService);
    getMyLibrary(req: any): Promise<import("./library.schema").LibraryEntry[]>;
    addToLibrary(bookId: string, status: ReadStatus, req: any): Promise<import("mongoose").Document<unknown, {}, import("./library.schema").LibraryEntryDocument, {}, {}> & import("./library.schema").LibraryEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateStatus(bookId: string, status: ReadStatus, req: any): Promise<import("mongoose").Document<unknown, {}, import("./library.schema").LibraryEntryDocument, {}, {}> & import("./library.schema").LibraryEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(bookId: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("./library.schema").LibraryEntryDocument, {}, {}> & import("./library.schema").LibraryEntry & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
