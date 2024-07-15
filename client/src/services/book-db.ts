import { Book } from '@/types/books.types';
import { NextResponse } from 'next/server';

class BookService {
	private API_BASE_URL: string;

	constructor() {
		this.API_BASE_URL = 'http://localhost:8000/book';
	}

	public async createBook(book: Book): Promise<void> {
		try {
			const response = await fetch(this.API_BASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(book),
			});

			if (!response.ok) {
				throw new Error('Failed to create book');
			}

			console.log('Book created successfully');
		} catch (error) {
			console.error('Error:', error);
		}
	}

	async getBooks(): Promise<Book[]> {
		try {
			const response = await fetch(this.API_BASE_URL);

			if (!response.ok) {
				throw new Error('Failed to fetch books');
			}

			return response.json();
		} catch (error) {
			console.error('Error:', error);

			return [];
		}
	}

	async getBookById(bookId: string): Promise<Book | null> {
		try {
			const response = await fetch(`${this.API_BASE_URL}/${bookId}`);

			if (!response.ok) {
				return null;
			}

			return response.json();
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}
}

export const bookService = new BookService();
