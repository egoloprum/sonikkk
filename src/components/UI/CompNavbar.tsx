"use client"

import { FC } from "react"
import { Grape } from "lucide-react"
import Link from "next/link"

interface CompNavbarProps {
  className: string
}

const CompNavbar:FC<CompNavbarProps> = ({className}) => {

  return (
    <div className='flex justify-center z-10 text-black_text_white'>
      <div className={`${className} p-4`}>

        <div className="gap-4 flex flex-wrap items-center py-4 text-black_text_primary">
          <Link href='/' className="md:text-2xl sm:text-base rounded hover:underline flex select-none
            items-center gap-1 p-1 max-w-[15rem]">
            <Grape className="w-10 h-10" />
            <p className="font-bold">Diet Planner</p>
          </Link>
          
          <Link href='/instruction' className="md:text-base sm:text-sm rounded hover:underline select-none
            flex items-center p-1 max-w-[10rem]">
            <p className="font-bold">How it Works</p>
          </Link>
          
          <Link href='/discover' className="md:text-base sm:text-sm rounded hover:underline select-none
            flex items-center p-1 max-w-[10rem]">
            <p className="font-bold">Browse Foods</p>
          </Link>

          <Link href='/login' className="md:text-base sm:text-sm rounded hover:underline p-1 
           max-w-[10rem] ml-auto flex g items-center font-bold select-none">
            Log in
          </Link>
        </div>
      </div>

    </div>
  )
}

export default CompNavbar
