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
exports.LibraryController = void 0;
const common_1 = require("@nestjs/common");
const library_service_1 = require("./library.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const library_schema_1 = require("./library.schema");
let LibraryController = class LibraryController {
    constructor(libraryService) {
        this.libraryService = libraryService;
    }
    getMyLibrary(req) {
        return this.libraryService.getMyLibrary(req.user.userId);
    }
    addToLibrary(bookId, status = library_schema_1.ReadStatus.WANT_TO_READ, req) {
        return this.libraryService.addToLibrary(req.user.userId, bookId, status);
    }
    updateStatus(bookId, status, req) {
        return this.libraryService.updateStatus(req.user.userId, bookId, status);
    }
    remove(bookId, req) {
        return this.libraryService.removeFromLibrary(req.user.userId, bookId);
    }
};
exports.LibraryController = LibraryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "getMyLibrary", null);
__decorate([
    (0, common_1.Post)(':bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "addToLibrary", null);
__decorate([
    (0, common_1.Patch)(':bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "remove", null);
exports.LibraryController = LibraryController = __decorate([
    (0, common_1.Controller)('library'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [library_service_1.LibraryService])
], LibraryController);
//# sourceMappingURL=library.controller.js.map