import { bookService } from '@/services/db';
import { Book } from '@/types/books.types';
import { useEffect, useState } from 'react';

export const useBooks = (): Book[] => {
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		const fetchBooksData = async () => {
			const books: Book[] = await bookService.getBooks();
			setBooks(books);
		};

		fetchBooksData();
	}, []);

	return books;
};
