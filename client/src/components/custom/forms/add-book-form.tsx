import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { bookService } from "@/services/book-db";
import { Book } from "@/types/books.types";
import { Minus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddBookForm = ({ onAddBook }: { onAddBook: (book: Book) => void }) => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [authors, setAuthors] = useState<string[]>([""]);

  const handleSubmit = async (e: React.FormEvent) => {
    const book: Book = { title, description, isbn, authors };
    await bookService.createBook(book);
    router.refresh();
  };

  const handleAddAuthor = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const handleRemoveAuthor = (index: number) => {
    const newAuthors = [...authors];
    newAuthors.splice(index, 1);
    setAuthors(newAuthors);
  };

  const addAuthorField = () => {
    setAuthors([...authors, ""]);
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label>Book Title:</Label>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIsDisabled(e.target.value.length >= 3);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Book Description:</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>
          Book ISBN <small>(If any):</small>
        </Label>
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
        </div>
        {authors.map((author, index = 1) => (
          <div className="flex gap-2">
            <Input
              key={index}
              value={author}
              onChange={(e) => handleAddAuthor(index, e.target.value)}
            />
            <Button
              variant="destructive"
              type="button"
              onClick={() => handleRemoveAuthor(index)}
            >
              <X size={16} />
            </Button>
          </div>
        ))}

        <Button variant="outline" type="button" onClick={addAuthorField}>
          <small>Add more author</small>
        </Button>
      </div>

      <Button type="submit" disabled={isDisabled}>
        Submit
      </Button>
      <DrawerFooter className="p-0">
        <DrawerClose>
          <Button type="button" variant="ghost">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </form>
  );
};

export default AddBookForm;
