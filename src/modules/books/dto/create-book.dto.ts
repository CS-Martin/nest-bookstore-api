import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateBookDto {
    // I wonder how this works?
    // Book id is generated by the database or service
    // It cannot be set by the user, thus isOptional
    @IsOptional()
    @IsInt()
    id?: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @MinLength(3, { each: true })
    authors: string[];
}
