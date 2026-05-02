import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LibraryService } from './library.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReadStatus } from './library.schema';

@Controller('library')
@UseGuards(JwtAuthGuard)
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  getMyLibrary(@Request() req) {
    return this.libraryService.getMyLibrary(req.user.userId);
  }

  @Post(':bookId')
  addToLibrary(
    @Param('bookId') bookId: string,
    @Body('status') status: ReadStatus = ReadStatus.WANT_TO_READ,
    @Request() req,
  ) {
    return this.libraryService.addToLibrary(req.user.userId, bookId, status);
  }

  @Patch(':bookId')
  updateStatus(
    @Param('bookId') bookId: string,
    @Body('status') status: ReadStatus,
    @Request() req,
  ) {
    return this.libraryService.updateStatus(req.user.userId, bookId, status);
  }

  @Delete(':bookId')
  remove(@Param('bookId') bookId: string, @Request() req) {
    return this.libraryService.removeFromLibrary(req.user.userId, bookId);
  }
}
