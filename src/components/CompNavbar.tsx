"use client"

import { FC, useState } from "react"
import SignIn from "./Sign-in"
import { Grape, Menu, X } from "lucide-react"
import Link from "next/link"

interface CompNavbarProps {
  className: string
}

const CompNavbar:FC<CompNavbarProps> = ({className}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={`flex justify-center sm:bg-green-300`}>
      <div className={`${className} mb-16 sm:mb-0 sm:p-4`}>
        <div className="gap-4 sm:flex hidden">
          <Link href='/' className="md:text-base sm:text-sm text-xs rounded hover:bg-gray-100 hover:underline flex select-none
            items-center gap-1 border-2 p-2 basis-1/4 max-w-[10rem]">
            <Grape />
            <p className="font-bold">Diet Planner</p>
          </Link>
          <Link href='/instruction' className="md:text-base sm:text-sm text-xs rounded hover:bg-gray-100 hover:underline select-none
            flex items-center border-2 p-2 basis-1/4 max-w-[10rem]">
            <p className="font-bold">How it Works</p>
          </Link>
          <Link href='/generate-meal' className="md:text-base sm:text-sm text-xs rounded hover:bg-gray-100 hover:underline select-none
            flex items-center border-2 p-2 basis-1/4 max-w-[10rem]">
            <p className="font-bold">Browse Foods</p>
          </Link>

          <SignIn className="md:text-base sm:text-sm text-xs rounded hover:bg-gray-100 hover:underline border-2 p-2 
            basis-1/4 max-w-[10rem] ml-auto flex gap-2 items-center font-bold select-none">Log in
          </SignIn>
        </div>

        <div className={`sm:hidden flex flex-col w-full fixed ${isOpen ? 'bg-gray-200 h-screen z-10': ''}`}>
          <div className="flex w-full bg-green-300 px-4 py-2">
            <Link href='/' onClick={() => setIsOpen(false)}
              className="md:text-base sm:text-sm rounded hover:bg-gray-100 hover:underline flex items-center gap-1 border-2 p-2 max-w-[10rem] select-none">
              <Grape />
              <p className="font-bold">Diet Planner</p>
            </Link>

            <div onClick={() => {setIsOpen(!isOpen)}} className="ml-auto border-2 p-2 cursor-pointer hover:bg-gray-100 select-none">
              {isOpen ? (<X />): (<Menu/>)}
            </div>
          </div>

          {isOpen ? (
            <div className="sm:hidden flex flex-col gap-6 px-4 py-6 h-full">
              <Link href='/instruction' onClick={() => setIsOpen(false)} 
                className="md:text-base sm:text-sm  rounded hover:bg-gray-100 hover:underline flex items-center border-2 border-gray-300 p-2 select-none">
                <p className="font-bold">How it Works</p>
              </Link>
              <Link href='/generate-meal' onClick={() => setIsOpen(false)} 
                className="md:text-base sm:text-sm  rounded hover:bg-gray-100 hover:underline flex items-center border-2 border-gray-300 p-2 select-none">
                <p className="font-bold">Browse Foods</p>
              </Link>

              <SignIn className="md:text-base sm:text-sm font-bold rounded hover:bg-gray-100 hover:underline 
                border-2 border-gray-300 p-2 select-none flex gap-2 items-center">Log in
              </SignIn>
            </div>
          ) : (null)}
        </div>

      </div>

    </div>
  )
}

export default CompNavbar
