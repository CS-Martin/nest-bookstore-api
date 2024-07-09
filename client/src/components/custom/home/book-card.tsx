import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Book as BookCardProps } from "@/types/books.types";
import Image from "next/image";

const BookCard: React.FC<{ book: BookCardProps }> = ({ book }) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="p-0 ">
        <Image
          src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
          priority={true}
          width={300}
          height={500}
          alt={`${book.title} cover`}
          className="object-cover h-[280px] w-auto rounded-md "
        />
        <CardTitle className="text-[18px] font-medium">{book.title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default BookCard;
