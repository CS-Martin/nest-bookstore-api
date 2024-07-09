import { Book } from '@/types/books.types';

const fetchBooks = async (): Promise<Book[]> => {
	try {
		const response: Response = await fetch('http://localhost:3000/books');

		if (!response.ok) {
			throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		console.log('Books fetched successfully:', data);
		return data;
	} catch (error) {
		if (error instanceof TypeError) {
			console.error('Network error or invalid URL:', error);
		} else {
			console.error('Error fetching books:', error);
		}
		throw error;
	}
};

const fetchBookCover = async (): Promise<string> => {};

export default fetchBooks;