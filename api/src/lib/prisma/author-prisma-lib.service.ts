import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AuthorPrismaDto } from 'src/modules/author/dto/create-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorPrismaLibService {
    constructor(
        @Inject(forwardRef(() => PrismaService))
        private prisma: PrismaService,
    ) {}

    async createAuthor(authorData: AuthorPrismaDto) {
        await this.prisma.author.create({
            data: {
                name: authorData.name,
            },
        });
    }
}
