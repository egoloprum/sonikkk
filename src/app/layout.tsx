import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/UI/Providers";
import { Montserrat } from 'next/font/google';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CompSidebar from "@/components/UI/CompSidebar";
import CompNavbar from "@/components/UI/CompNavbar";

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
      <body className={`${bangers.className} flex ${ !session ? 'flex-col' : '' } dark:bg-black_mid 
        dark:text-white_text bg-white_extra relative `}>
        { !session ? (
          <>
            <CompNavbar className='max-w-[1000px] w-full z-10' />

            <div id="tileGrid" className="bg-black_extra z-0 h-full w-full absolute top-0 left-0"></div>
          </>

        ) : (
          <CompSidebar profile={{picture: session.user.image!, username: session.user.name! }} />
        ) }
        <main className={`${ !session ? 'flex justify-center' : 'mb-20 sm:mb-0' } w-full z-10 h-full`}>
          <div className={`${ !session ? 'max-w-[1000px] px-4' : '' } w-full`}>
            <Providers>{children}</Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
