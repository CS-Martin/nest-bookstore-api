import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorDbLibService } from 'src/lib/db/author-db-lib.service';

@Module({
    controllers: [AuthorController],
    providers: [AuthorService, AuthorDbLibService],
})
export class AuthorModule {}
