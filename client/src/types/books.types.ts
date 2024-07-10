export type Book = {
  // Id is not required here because it will be generated in backend service
  // id: number;

  title: string;
  isbn: string;
  description: string;
  authors: string[];
};
