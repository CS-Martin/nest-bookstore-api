'use client';

import { useBooks } from "@/hooks/books.hooks";
import { ModeToggle } from "./theme-toggler";

const Navbar = () => {
    const books = useBooks();
    console.log(books);

    return (
        <nav className="flex absolute top-0 left-0 w-full flex-col gap-4 border-b">
            <div className="flex justify-between items-center p-3 py-5">
                <h1 className="text-2xl font-bold">Logo</h1>
                <ModeToggle />
            </div>
        </nav>
    );
};

export default Navbar;