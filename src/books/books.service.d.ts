import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto, SuggestBookDto, UpdateBookDto } from './books.dto';
export declare class BooksService {
    private bookModel;
    constructor(bookModel: Model<BookDocument>);
    findAll(genre?: string, sort?: string): Promise<Book[]>;
    findPopular(): Promise<Book[]>;
    findTopRated(): Promise<Book[]>;
    findById(id: string): Promise<Book>;
    create(createBookDto: CreateBookDto): Promise<Book>;
    suggest(suggestBookDto: SuggestBookDto): Promise<Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<Book>;
    search(query: string): Promise<Book[]>;
    seedBooks(): Promise<void>;
}
