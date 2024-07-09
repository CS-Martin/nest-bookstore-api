import { ModeToggle } from "./theme-toggler";

const Navbar = () => {
    return (
        <nav className="flex flex-col gap-4 border-b">
            <div className="flex justify-between items-center p-3 py-5">
                <h1 className="text-2xl font-bold">Logo</h1>
                <ModeToggle />
            </div>
        </nav>
    );
};

export default Navbar;