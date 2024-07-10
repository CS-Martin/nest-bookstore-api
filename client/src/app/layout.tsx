import type { Metadata } from "next";
import {
  Handlee,
  Inter,
  Patrick_Hand,
  Playfair_Display,
  Playpen_Sans,
  Poppins,
} from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "Bookshelf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-black relative h-screen w-screen overflow-x-hidden p-0 m-0 flex flex-col items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
