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
exports.LibraryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const library_schema_1 = require("./library.schema");
let LibraryService = class LibraryService {
    constructor(libraryModel) {
        this.libraryModel = libraryModel;
    }
    async getMyLibrary(userId) {
        return this.libraryModel
            .find({ user: new mongoose_2.Types.ObjectId(userId) })
            .populate('book')
            .sort({ updatedAt: -1 })
            .exec();
    }
    async addToLibrary(userId, bookId, status) {
        const existing = await this.libraryModel.findOne({
            user: new mongoose_2.Types.ObjectId(userId),
            book: new mongoose_2.Types.ObjectId(bookId),
        });
        if (existing) {
            existing.status = status;
            return existing.save();
        }
        const entry = new this.libraryModel({
            user: new mongoose_2.Types.ObjectId(userId),
            book: new mongoose_2.Types.ObjectId(bookId),
            status,
        });
        return entry.save();
    }
    async updateStatus(userId, bookId, status) {
        return this.libraryModel
            .findOneAndUpdate({ user: new mongoose_2.Types.ObjectId(userId), book: new mongoose_2.Types.ObjectId(bookId) }, { status }, { new: true })
            .populate('book')
            .exec();
    }
    async removeFromLibrary(userId, bookId) {
        return this.libraryModel
            .findOneAndDelete({
            user: new mongoose_2.Types.ObjectId(userId),
            book: new mongoose_2.Types.ObjectId(bookId),
        })
            .exec();
    }
};
exports.LibraryService = LibraryService;
exports.LibraryService = LibraryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(library_schema_1.LibraryEntry.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LibraryService);
//# sourceMappingURL=library.service.js.map