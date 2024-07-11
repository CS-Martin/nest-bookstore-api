import { OmitType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MinLength(1, { each: true })
    books?: string[];
}

export class AuthorDto extends OmitType(CreateAuthorDto, ['books'] as const) {
    id: number;
}
