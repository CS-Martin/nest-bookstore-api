import Navbar from "@/components/custom/nav";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="bg-background w-[500px] h-full">
        <Navbar />
      </main>
    </ThemeProvider>
  );
}
