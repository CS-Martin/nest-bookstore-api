import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Book as BookCardProps } from "@/types/books.types";
import { Playpen_Sans } from "next/font/google";
import Image from "next/image";

const playpenSans = Playpen_Sans({ subsets: ["latin"] });

const BookCard: React.FC<{ book: BookCardProps }> = ({ book }) => {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="p-0 ">
        <Image
          src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
          priority={true}
          width={300}
          height={500}
          alt={`${book.title} cover`}
          className="object-cover h-[280px] w-auto rounded-md "
        />

        <CardTitle className="text-[16px] font-semibold">
          {book.title}
        </CardTitle>
        <small style={{ marginTop: "0px" }} className="truncate text-gray-500">
          by {book.authors.map((author) => author).join(" & ")}
        </small>
      </CardHeader>
    </Card>
  );
};

export default BookCard;
