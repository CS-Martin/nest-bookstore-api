import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Book as BookCardProps } from "@/types/books.types";

const BookCard: React.FC<{ book: BookCardProps }> = ({ book }) => {
    return (
        <Card>
            <img src="https://covers.openlibrary.org/b/isbn/9780062104892-L.jpg" height={100} width={100} alt="" />
        </Card>
    )
}

export default BookCard;