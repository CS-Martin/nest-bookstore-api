import { OmitType } from '@nestjs/mapped-types';
import { BookEntity } from '../entities/book.entity';

export class CreateBookDto extends OmitType(BookEntity, [
    'id',
    'createdAt',
    'updatedAt',
]) {}
