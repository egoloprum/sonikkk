"use client"

import { FC, useState } from "react"
import SignIn from "../Sign-in"
import { Grape, Menu, X } from "lucide-react"
import Link from "next/link"

interface CompNavbarProps {
  className: string
}

const CompNavbar:FC<CompNavbarProps> = ({className}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className='flex justify-center z-10 text-black_text_white'>
      <div className={`${className} mb-16 sm:mb-0 sm:p-4`}>

        {/* desktop */}

        <div className="gap-2 sm:flex items-center hidden py-4 text-black_text_primary">
          <Link href='/' className="md:text-base sm:text-sm text-xs rounded hover:underline flex select-none
            items-center gap-1 p-1 max-w-[10rem]">
            <Grape />
            <p className="font-bold">Diet Planner</p>
          </Link>
          <span className="text-neutral-100 text-2xl select-none">·</span>
          <Link href='/instruction' className="md:text-base sm:text-sm text-xs rounded hover:underline select-none
            flex items-center p-1 max-w-[10rem]">
            <p className="font-bold">How it Works</p>
          </Link>
          <span className="text-neutral-100 text-2xl select-none">·</span>
          <Link href='/discover' className="md:text-base sm:text-sm text-xs rounded hover:underline select-none
            flex items-center p-1 max-w-[10rem]">
            <p className="font-bold">Browse Foods</p>
          </Link>

          <Link href='/login' className="md:text-base sm:text-sm text-xs rounded hover:underline p-1 
           max-w-[10rem] ml-auto flex g items-center font-bold select-none">
            Log in
          </Link>
        </div>

        {/* mobile */}

        <div className={`sm:hidden flex flex-col w-full fixed ${isOpen ? 'bg-gray-200 h-screen z-10': ''}`}>
          <div className="flex w-full px-4 py-2">
            <Link href='/' onClick={() => setIsOpen(false)}
              className="md:text-base sm:text-sm rounded hover:underline flex items-center gap-1 border-2 max-w-[10rem] select-none">
              <Grape />
              <p className="font-bold">Diet Planner</p>
            </Link>

            <div onClick={() => {setIsOpen(!isOpen)}} className="ml-auto border-2 cursor-pointer select-none">
              {isOpen ? (<X />): (<Menu/>)}
            </div>
          </div>

          {isOpen ? (
            <div className="sm:hidden flex flex-col gap-6 px-4 py-6 h-full">
              <Link href='/instruction' onClick={() => setIsOpen(false)} 
                className="md:text-base sm:text-sm  rounded hover:underline flex items-center border-2 border-gray_border select-none">
                <p className="font-bold">How it Works</p>
              </Link>
              <Link href='/discover' onClick={() => setIsOpen(false)} 
                className="md:text-base sm:text-sm  rounded hover:underline flex items-center border-2 border-gray_border select-none">
                <p className="font-bold">Browse Foods</p>
              </Link>

              <SignIn className="md:text-base sm:text-sm font-bold rounded hover:underline 
                border-2 border-gray_border select-none flex g items-center">Log in
              </SignIn>
            </div>
          ) : (null)}
        </div>

      </div>

    </div>
  )
}

export default CompNavbar
