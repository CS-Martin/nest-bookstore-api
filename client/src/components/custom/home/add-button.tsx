import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const AddButton = () => {
    return (
        <button className="fixed ms-80 z-50 bottom-10 p-4 rounded-full bg-blue-500 shadow-xl">
            <Plus className="text-background" size={32} />
        </button>
    )
}

export default AddButton