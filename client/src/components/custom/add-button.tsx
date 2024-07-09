import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const AddButton = () => {
    return (
        <button className="fixed ms-[73%] sm:ms-[85%] md:ms-80 z-50 bottom-10 p-4 rounded-full bg-blue-500 shadow-xl">
            <Plus className="text-white" size={32} />
        </button>
    )
}

export default AddButton