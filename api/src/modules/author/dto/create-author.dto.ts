import { OmitType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';
import { AuthorEntity } from '../entities/author.entity';

export class CreateAuthorDto implements Omit<AuthorEntity, 'id'> {
    @IsString()
    @MinLength(1)
    name: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MinLength(1, { each: true })
    books?: string[];
}

export class AuthorPrismaDto extends OmitType(AuthorEntity, ['id'] as const) {}
