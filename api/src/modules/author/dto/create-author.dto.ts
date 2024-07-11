import { OmitType } from '@nestjs/mapped-types';

export class CreateAuthorDto {
    name: string;
    books?: string[];
}

export class AuthorDto extends OmitType(CreateAuthorDto, ['books'] as const) {
    id: number;
}
