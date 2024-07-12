import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { AuthorModule } from './modules/author/author.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [BookModule, AuthorModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
