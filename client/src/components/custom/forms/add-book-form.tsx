import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

const AddBookForm = () => {
    return (
        <form action="" className="px-4 flex flex-col gap-3">

            <div className="flex flex-col gap-2">
                <Label>Book Title:</Label>
                <Input placeholder="Ex. Harry Potter and the Philosopher's Stone" />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Book Description:</Label>
                <Textarea placeholder="Ex. Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling." />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Book ISBN <small>(If any):</small></Label>
                <Input placeholder="Ex. 9783161484100" />
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Label>Author/s:</Label>
                    <Button variant="outline"><small>Add more author</small></Button>
                </div>
                <Input placeholder="Ex. J.K. Rowling" />
            </div>

        </form>
    )
}

export default AddBookForm