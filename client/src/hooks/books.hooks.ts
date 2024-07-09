import { useEffect, useState } from "react";
import fetchBooks from "../services/books-api.service";

export const useBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  return books;
};
