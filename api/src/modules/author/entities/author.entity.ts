import { Author as AuthorModel } from '@prisma/client';

export class AuthorEntity implements AuthorModel {
    id: string;
    name: string;
}
