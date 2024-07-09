"use client";

import AddButton from "@/components/custom/add-button";
import BookCard from "@/components/custom/home/book-card";
import Navbar from "@/components/custom/nav";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { useBooks } from "@/hooks/books.hooks";
import { Book } from "@/types/books.types";

export default function Home() {
  const books = useBooks();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="bg-background relative lg:w-[420px] px-4 pt-24 min-h-screen h-fi">
        <Navbar />


        <div className="grid grid-cols-2 mt-3 gap-5">
          {books.map((book: Book, index: number) => (
            <BookCard key={index} book={book} />
          ))}
        </div>

        <AddButton />
      </main>
    </ThemeProvider>
  );
}
