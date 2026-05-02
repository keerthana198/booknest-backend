import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { LibraryEntry, LibraryEntrySchema } from './library.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LibraryEntry.name, schema: LibraryEntrySchema },
    ]),
  ],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
