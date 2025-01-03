import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/UI/Providers";
import { Montserrat } from 'next/font/google';

import CompSidebar from "@/components/UI/CompSidebar";
import CompNavbar from "@/components/UI/CompNavbar";
import { createClient } from "@/utils/supabase";

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

  const supabase = await createClient()

  const {data} = await supabase.auth.getUser()
  const user = data.user

  return (

    <html lang="en">
      <body className={`${bangers.className} flex ${ !user ? 'flex-col' : '' } dark:bg-black_mid 
        dark:text-white_text bg-white_extra relative `}>
        { !user ? (
          <>
            <CompNavbar className='max-w-[1000px] w-full z-10' />

            <div id="tileGrid" className="bg-black_extra z-0 h-full w-full absolute top-0 left-0"></div>
          </>

        ) : (
          <CompSidebar profile={{picture: user.user_metadata.picture!, username: user.user_metadata.name! }} />
        ) }
        <main className={`${ !user ? 'flex justify-center' : 'mb-20 sm:mb-0' } w-full z-10 h-full`}>
          <div className={`${ !user ? 'max-w-[1000px] px-4' : '' } w-full`}>
            <Providers>{children}</Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
