import { BooksService } from './books.service';
import { CreateBookDto, SuggestBookDto, UpdateBookDto } from './books.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(genre?: string, sort?: string): Promise<import("./book.schema").Book[]>;
    findPopular(): Promise<import("./book.schema").Book[]>;
    findTopRated(): Promise<import("./book.schema").Book[]>;
    search(query: string): Promise<import("./book.schema").Book[]>;
    seed(): Promise<void>;
    findOne(id: string): Promise<import("./book.schema").Book>;
    create(createBookDto: CreateBookDto): Promise<import("./book.schema").Book>;
    suggest(suggestBookDto: SuggestBookDto): Promise<import("./book.schema").Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<import("./book.schema").Book>;
}
