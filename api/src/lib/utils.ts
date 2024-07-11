import * as fs from 'fs';

// Get Books or Authors
export const loadBooks = () => {
    try {
        const data = fs.readFileSync('data/data.json', 'utf-8');
        return JSON.parse(data).books;
    } catch (err) {
        console.error('Failed to fetch data from file', err);
        return [];
    }
};

export const loadAuthors = () => {
    try {
        const data = fs.readFileSync('data/data.json', 'utf-8');
        return JSON.parse(data).authors;
    } catch (err) {
        console.error('Failed to fetch data from file', err);
        return [];
    }
};

export const loadBooksAndAuthors = () => {
    try {
        const data = fs.readFileSync('data/data.json', 'utf-8');
        return JSON.parse(data).authors_and_books;
    } catch (err) {
        console.error('Failed to fetch data from file', err);
        return [];
    }
};
