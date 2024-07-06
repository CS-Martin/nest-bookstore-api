export class CreateBookDto {
    id?: number;
    title: string;
    description: string;
    authors: number[] | string[];
}
