import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAuthorDto {
    id?: number;
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsOptional()
    books?: number[];
}
