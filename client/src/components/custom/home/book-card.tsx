import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Book as BookCardProps } from "@/types/books.types";
import Image from "next/image";

const BookCard: React.FC<{ book: BookCardProps }> = ({ book }) => {
  return (
    <Card>
      <Image
        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
        height={100}
        width={100}
        alt=""
      />
    </Card>
  );
};

export default BookCard;
