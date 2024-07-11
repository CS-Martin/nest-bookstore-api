import { OmitType } from '@nestjs/mapped-types';

export class CreateBookDto {
    title: string;
    description: string;
    isbn: string;
    authors: string[];
}

export class BookDto extends OmitType(CreateBookDto, ['authors'] as const) {
    id: number;
}
