'use client'

import Navbar from "@/components/custom/nav";
import { useBookDetails } from "@/hooks/books.hooks";
import { notFound, useParams } from "next/navigation";
import BookImage from "./_component/book-image";

const BookDetailsPage = (): JSX.Element => {
    const params = useParams();
    const bookId = params.book[0];

    const { book, loading } = useBookDetails(bookId);

    console.log(book);

    if (loading) {
        return <div>Loading...</div>; // Show a loading state
    }

    if (book === null) {
        return notFound();
    }

    return (
        <div className="bg-background lg:w-[420px] relative pt-24 h-screen">
            <div className="h-fit bg-background px-7">
                <Navbar />

                <div className="flex flex-col items-center justify-center">
                    <BookImage isbn={book.isbn} />

                    <div className="text-center py-5">
                        <p className="text-[21px] font-semibold">{book.title}</p>
                        <small style={{ marginTop: "0px" }} className="truncate text-gray-500">
                            by {book.authors.map((author) => author).join(" & ")}
                        </small>
                    </div>


                    <p className="text-justify">{book.description}</p>
                </div>

            </div>
        </div>
    )
}

export default BookDetailsPage;