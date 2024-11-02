import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { Montserrat } from 'next/font/google';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CompSidebar from "@/components/CompSidebar";

const bangers = Montserrat({
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: "Meal planner",
  description: "describe",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)

  return (

    <html lang="en">
      <body className={`${bangers.className} flex dark:bg-[#1e2020] dark:text-[#d6d8da] bg-[#feffff]`}>
        { !session ? (
          null
        ) : (
          <CompSidebar profile={{picture: session.user.image!, username: session.user.name! }} />
        ) }
        <main className="w-full">
          <div className="py-4 px-12 w-full">
            <Providers>{children}</Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
