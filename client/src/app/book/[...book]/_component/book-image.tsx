import { Book } from "@/types/books.types";
import Image from "next/image";

type BookImageProps = Pick<Book, 'isbn'>;

const BookImage: React.FC<BookImageProps> = ({ isbn }) => {
    return (
        <Image
            src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}
            alt=''
            priority={true}
            width={300}
            height={500}
            className="object-cover h-[280px] w-auto rounded-md "
        />
    );
};

export default BookImage;