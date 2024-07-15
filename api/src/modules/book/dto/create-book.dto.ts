import { OmitType } from '@nestjs/mapped-types';

import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { BookEntity } from '../entities/book.entity';

export class CreateBookDto implements Omit<BookEntity, 'id'> {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    isbn: string;

    // Authors is included here because when we receive the data from the client,
    // the authors are included in the request body.
    // However, authors[] are not included in book table
    // authors[] are stored in book_author table, used as a way to create relationship
    @IsArray()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    authors: string[];
}

export class BookPrismaDto extends OmitType(BookEntity, ['id'] as const) {}
