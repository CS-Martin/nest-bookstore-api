import * as fs from 'fs';

// Get Books or Authors
export const loadData = () => {
    try {
        const data = fs.readFileSync('data/data.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Failed to fetch data from file', err);
        return { Books: [], Authors: [] };
    }
};
