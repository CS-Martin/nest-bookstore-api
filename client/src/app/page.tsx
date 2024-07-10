"use client";

import AddButton from "@/components/custom/add-button";
import BookCard from "@/components/custom/home/book-card";
import Navbar from "@/components/custom/nav";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { useBooks } from "@/hooks/books.hooks";
import { Book } from "@/types/books.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const books = useBooks();
  // const [books, setBooks] = useState<Book[]>([]);

  // useEffect(() => {
  //   setBooks(fetchedBooks);
  // }, [fetchedBooks]);

  const handleAddBook = (book: Book) => {
    // setBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="bg-background relative lg:w-[420px] pt-24 h-screen">
        <div className="bg-white h-fit px-4 ">
          <Navbar />


          <div className="grid grid-cols-2 mt-3 gap-5">
            {books.map((book: Book, index: number) => (
              <BookCard key={index} book={book} />
            ))}
          </div>


          <AddButton />
        </div>
      </main>
    </ThemeProvider>
  );
}