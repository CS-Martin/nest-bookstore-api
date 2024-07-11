import { OmitType } from '@nestjs/mapped-types';

import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    isbn?: string;

    @IsArray()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    authors: string[];
}

export class BookDto extends OmitType(CreateBookDto, ['authors'] as const) {
    id: number;
}
