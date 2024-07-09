import type { Metadata } from "next";
import { Handlee, Inter, Patrick_Hand, Playfair_Display, Playpen_Sans } from "next/font/google";
import "./globals.css";

const patrickHand = Patrick_Hand({ subsets: ['latin'], weight: '400' });
const handlee = Handlee({ subsets: ['latin'], weight: '400' });
const playpenSans = Playpen_Sans({ subsets: ['latin'] });

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
        className={`${playpenSans.className} bg-black h-[100%] w-full p-0 m-0 flex flex-col items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}

