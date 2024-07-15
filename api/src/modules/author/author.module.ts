import { Module, forwardRef } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { SharedModule } from '../shared-module.module';
import { AuthorPrismaLibService } from 'src/lib/prisma/author-prisma-lib.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [forwardRef(() => SharedModule)],
    controllers: [AuthorController],
    providers: [AuthorService, PrismaService, AuthorPrismaLibService],
    exports: [AuthorService],
})
export class AuthorModule {}
