import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, SuggestBookDto, UpdateBookDto } from './books.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query('genre') genre?: string, @Query('sort') sort?: string) {
    return this.booksService.findAll(genre, sort);
  }

  @Get('popular')
  findPopular() {
    return this.booksService.findPopular();
  }

  @Get('top-rated')
  findTopRated() {
    return this.booksService.findTopRated();
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.booksService.search(query);
  }

  @Get('seed')
  seed() {
    return this.booksService.seedBooks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Post('suggest')
  @UseGuards(JwtAuthGuard)
  suggest(@Body() suggestBookDto: SuggestBookDto) {
    return this.booksService.suggest(suggestBookDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }
}
