"use client";

import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./theme-toggler";
import { ChevronLeft } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const showBackButton = pathname.includes("/book");

  return (
    <nav className="flex absolute top-0 left-0 w-full flex-col gap-4 border-b">
      <div className="flex justify-between items-center p-3 py-5">

        {/* Only show back button on book pages */}
        {showBackButton && (
          <button onClick={() => router.back()} className="text-lg font-medium">
            <ChevronLeft size={28} />
          </button>
        )}

        <h1 className="text-lg font-medium">Logo</h1>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
