import { bookService } from '@/services/book-db';
import { Book } from '@/types/books.types';
import { useRouter } from 'next/navigation';
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

export const useBookDetails = (bookId: string) => {
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const fetchedBook = await bookService.getBookById(bookId);
				setBook(fetchedBook);
			} catch (error) {
				console.error('Error fetching book details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchBook();
	}, [bookId]);

	return { book, loading };
};
