"use client";

import AddButton from "@/components/custom/add-button";
import BookCard from "@/components/custom/home/book-card";
import Navbar from "@/components/custom/nav";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { useBooks } from "@/hooks/books.hooks";

export default function Home() {
  const books = useBooks();
  console.log(books);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="bg-background scrollbar-hide relative w-full lg:w-[420px] px-4 pt-24 h-full">
        <Navbar />


        <div className="grid grid-cols-2 mt-3 gap-5">
          {books.map((book) => (
            <BookCard key={book} book={book} />
          ))}
        </div>


        <AddButton />
      </main>
    </ThemeProvider>
  );
}
