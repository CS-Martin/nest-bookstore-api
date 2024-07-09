import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import AddBookForm from "./forms/add-book-form"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"

const AddButton = () => {
    return (
        <Drawer>
            <DrawerTrigger className="fixed ms-[73%] sm:ms-[85%] md:ms-80 z-50 bottom-10 p-4 rounded-full bg-blue-500 shadow-xl">
                <Plus className="text-white" size={32} />
            </DrawerTrigger>
            <DrawerContent className="mx-auto max-w-[420px] h-full max-h-[90%]">
                <DrawerHeader>
                    <DrawerTitle>Create Book</DrawerTitle>
                    <DrawerDescription>Fill the form below to create a new book.</DrawerDescription>
                    <Separator />
                </DrawerHeader>

                <ScrollArea className="overflow-y-auto">
                    <AddBookForm />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}

export default AddButton