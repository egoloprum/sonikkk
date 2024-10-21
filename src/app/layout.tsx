import type { Metadata } from "next";
import "./globals.css";
import CompNavbar from "@/components/CompNavbar";
import Providers from "@/components/Providers";
import { Orbitron } from 'next/font/google';

const bangers = Orbitron({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Meal planner",
  description: "describe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" data-theme="light">
      <body className={bangers.className}>
        <CompNavbar />
        <main className="flex justify-center">
          <div className="max-w-[1200px] p-4 w-full border-4 border-indigo-400">
            <Providers>{children}</Providers>

          </div>
        </main>
      </body>
    </html>
  );
}
