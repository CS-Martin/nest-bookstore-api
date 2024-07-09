import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { bookService } from "@/services/db"
import { Book } from "@/types/books.types"
import { useState } from "react"

const AddBookForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isbn, setIsbn] = useState('')
    const [authors, setAuthor] = useState<string[]>([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const book: Book = { title, description, isbn, authors };

        await bookService.createBook(book);
    };

    return (
        <form onSubmit={handleSubmit} className="px-4 py-3 flex flex-col gap-3">

            <div className="flex flex-col gap-2">
                <Label>Book Title:</Label>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex. Harry Potter and the Philosopher's Stone"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Book Description:</Label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex. Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling."
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Book ISBN <small>(If any):</small></Label>
                <Input
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="Ex. 9783161484100"
                />
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Label>Author/s:</Label>
                    <Button variant="outline"><small>Add more author</small></Button>
                </div>
                <Input
                    value={authors}
                    onChange={(e) => setAuthor([e.target.value])}
                    placeholder="Ex. J.K. Rowling"
                />
            </div>

            <Button type="submit">Submit</Button>
        </form>
    )
}

export default AddBookForm