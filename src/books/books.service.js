"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const book_schema_1 = require("./book.schema");
let BooksService = class BooksService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async findAll(genre, sort) {
        let query = this.bookModel.find();
        if (genre) {
            query = query.where('genres').in([genre]);
        }
        if (sort === 'rating') {
            query = query.sort({ rating: -1 });
        }
        else if (sort === 'newest') {
            query = query.sort({ createdAt: -1 });
        }
        else if (sort === 'reviews') {
            query = query.sort({ reviewCount: -1 });
        }
        return query.exec();
    }
    async findPopular() {
        return this.bookModel
            .find({ isPopular: true })
            .sort({ reviewCount: -1 })
            .limit(8)
            .exec();
    }
    async findTopRated() {
        return this.bookModel
            .find({ isTopRated: true })
            .sort({ rating: -1 })
            .limit(6)
            .exec();
    }
    async findById(id) {
        const book = await this.bookModel.findById(id).exec();
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        return book;
    }
    async create(createBookDto) {
        const book = new this.bookModel(createBookDto);
        return book.save();
    }
    async suggest(suggestBookDto) {
        const book = new this.bookModel({
            ...suggestBookDto,
            isSuggested: true,
        });
        return book.save();
    }
    async update(id, updateBookDto) {
        const book = await this.bookModel
            .findByIdAndUpdate(id, updateBookDto, { new: true })
            .exec();
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        return book;
    }
    async search(query) {
        return this.bookModel
            .find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
            ],
        })
            .limit(10)
            .exec();
    }
    async seedBooks() {
        const count = await this.bookModel.countDocuments();
        if (count > 0)
            return;
        const books = [
            {
                title: 'The Silent Patient',
                author: 'Alex Michaelides',
                description: 'A psychological thriller about silence, trauma, and truth.',
                authorBio: `Alex Michaelides is a British-Cypriot author and screenwriter. He studied psychotherapy, which heavily influences his writing style. Before becoming a novelist, he worked in film and television. His debut novel became an international bestseller. He is known for crafting suspenseful stories with deep psychological elements.`,
                storyOutline: `The story revolves around Alicia Berenson, a famous painter who shoots her husband and then stops speaking completely. She is placed in a psychiatric facility where her silence becomes a mystery. A psychotherapist becomes obsessed with uncovering the truth behind her actions. As he digs deeper, shocking secrets begin to unfold. The novel explores trauma, obsession, and hidden truths.`,
                rating: 4.6,
                reviewCount: 12500,
                genres: ['Thriller', 'Mystery'],
                publishedYear: 2019,
                isPopular: true,
                isTopRated: false,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg'
            },
            {
                title: 'The Alchemist',
                author: 'Paulo Coelho',
                description: 'A philosophical novel about dreams and destiny.',
                authorBio: `Paulo Coelho is a Brazilian author known worldwide for his inspirational works. He was born in Rio de Janeiro and initially pursued various careers before writing. His works focus on spirituality, dreams, and personal growth. The Alchemist is one of the most translated books ever. His storytelling style is simple yet deeply meaningful.`,
                storyOutline: `The novel follows Santiago, a shepherd who dreams of finding treasure in Egypt. Guided by signs and encounters, he begins a journey of self-discovery. Along the way, he learns about courage, faith, and listening to one's heart. The journey teaches him that true treasure lies within. The story blends adventure with deep philosophical meaning.`,
                rating: 4.7,
                reviewCount: 9800,
                genres: ['Fiction', 'Fantasy'],
                publishedYear: 1988,
                isPopular: true,
                isTopRated: true,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg'
            },
            {
                title: 'It Ends with Us',
                author: 'Colleen Hoover',
                description: 'A deeply emotional novel about love and resilience.',
                authorBio: `Colleen Hoover is an American author known for her romance and emotional fiction. She gained popularity through self-publishing. Her books often explore complex relationships and personal struggles. She has a huge global fan base. Her storytelling connects deeply with readers on an emotional level.`,
                storyOutline: `The story follows Lily Bloom as she navigates love, relationships, and difficult choices. She falls for a charming neurosurgeon, but their relationship reveals painful truths. Her past resurfaces, forcing her to make tough decisions. The novel deals with love, abuse, and strength. It highlights the courage needed to break toxic cycles.`,
                rating: 4.5,
                reviewCount: 15200,
                genres: ['Romance', 'Fiction'],
                publishedYear: 2016,
                isPopular: true,
                isTopRated: false,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg'
            },
            {
                title: 'Think Like a Monk',
                author: 'Jay Shetty',
                description: 'A guide to train your mind for peace and purpose.',
                authorBio: `Jay Shetty is a former monk turned motivational speaker and author. He shares wisdom about mindfulness and purpose. His content reaches millions worldwide. He combines ancient practices with modern life advice. His teachings focus on clarity, discipline, and happiness.`,
                storyOutline: `The book explains how to apply monk-like thinking in daily life. It teaches how to remove negativity and find purpose. The author shares lessons from his monk life. It focuses on discipline, gratitude, and mental clarity. The goal is to live a more meaningful life.`,
                rating: 4.7,
                reviewCount: 8300,
                genres: ['Self-help', 'Biography'],
                publishedYear: 2020,
                isPopular: true,
                isTopRated: false,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9781982134488-L.jpg'
            },
            {
                title: 'Rich Dad Poor Dad',
                author: 'Robert T. Kiyosaki',
                description: 'A book about financial education and wealth mindset.',
                authorBio: `Robert Kiyosaki is an entrepreneur and financial educator. He is known for promoting financial literacy. His teachings focus on investing and money management. His books have influenced millions worldwide. He emphasizes building assets and financial independence.`,
                storyOutline: `The book compares two father figures: one rich and one poor. It explains different mindsets about money. It teaches how to build wealth through smart decisions. The author emphasizes financial education over formal schooling. It inspires readers to think differently about money.`,
                rating: 4.4,
                reviewCount: 7600,
                genres: ['Self-help', 'Biography'],
                publishedYear: 1997,
                isPopular: true,
                isTopRated: true,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg'
            },
            {
                title: 'The Hobbit',
                author: 'J.R.R. Tolkien',
                description: 'A fantasy adventure about courage and discovery.',
                authorBio: `J.R.R. Tolkien was an English writer and professor. He is known for creating Middle-earth. His works are foundational to modern fantasy. He was also a linguist and scholar. His storytelling is rich in imagination and detail.`,
                storyOutline: `Bilbo Baggins is a hobbit who joins a group of dwarves on a quest. They aim to reclaim their homeland from a dragon. Along the journey, Bilbo faces challenges and grows in courage. He encounters magical creatures and dangerous enemies. The story is about adventure, bravery, and self-discovery.`,
                rating: 4.8,
                reviewCount: 10100,
                genres: ['Fantasy', 'Fiction'],
                publishedYear: 1937,
                isPopular: true,
                isTopRated: true,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg'
            },
            {
                title: '1984',
                author: 'George Orwell',
                description: 'A dystopian novel about surveillance and control.',
                authorBio: `George Orwell was an English writer known for his political and social commentary. His works criticize totalitarianism. He is famous for Animal Farm and 1984. His writing remains relevant today. He focused on truth, freedom, and power.`,
                storyOutline: `The story is set in a totalitarian society ruled by Big Brother. Winston Smith works for the government but secretly rebels. He questions authority and seeks truth. The regime controls thoughts and reality. The novel explores freedom, control, and oppression.`,
                rating: 4.6,
                reviewCount: 9200,
                genres: ['Fiction', 'Thriller'],
                publishedYear: 1949,
                isPopular: false,
                isTopRated: true,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg'
            },
            {
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                description: 'A powerful story about justice and morality.',
                authorBio: `Harper Lee was an American novelist best known for this classic work. She won the Pulitzer Prize for this book. Her writing deals with racial injustice and morality. She wrote very few books but left a lasting impact. Her storytelling is simple yet profound.`,
                storyOutline: `The story is told through a young girl named Scout. Her father, Atticus Finch, defends a black man wrongly accused. The novel explores racism and justice in society. It highlights empathy and moral courage. The story is both emotional and thought-provoking.`,
                rating: 4.8,
                reviewCount: 11000,
                genres: ['Fiction', 'Biography'],
                publishedYear: 1960,
                isPopular: false,
                isTopRated: true,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg'
            },
            {
                title: 'The Kite Runner',
                author: 'Khaled Hosseini',
                description: 'A story of friendship, guilt, and redemption.',
                authorBio: `Khaled Hosseini is an Afghan-American author. His works focus on human relationships and emotions. He often writes about Afghanistan’s history. His books are globally popular. His storytelling is emotional and powerful.`,
                storyOutline: `The story follows Amir and his friend Hassan. A betrayal in childhood haunts Amir for years. He seeks redemption as an adult. The novel explores friendship, guilt, and forgiveness. It is a deeply emotional journey.`,
                rating: 4.7,
                reviewCount: 8900,
                genres: ['Fiction', 'Biography'],
                publishedYear: 2003,
                isPopular: false,
                isTopRated: true,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg'
            },
            {
                title: 'Atomic Habits',
                author: 'James Clear',
                description: 'A guide to building good habits and breaking bad ones.',
                authorBio: `James Clear is an author and speaker focused on habits and self-improvement. His work combines science and practical advice. He writes about behavior change and productivity. His ideas are simple but powerful. His book has helped millions improve their lives.`,
                storyOutline: `The book explains how small habits create big changes. It introduces a system for building good habits. It focuses on identity-based change. The author provides practical strategies. The goal is long-term self-improvement.`,
                rating: 4.8,
                reviewCount: 14500,
                genres: ['Self-help'],
                publishedYear: 2018,
                isPopular: true,
                isTopRated: true,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg'
            }
        ];
        await this.bookModel.insertMany(books);
        console.log('✅ Books seeded successfully');
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BooksService);
//# sourceMappingURL=books.service.js.map