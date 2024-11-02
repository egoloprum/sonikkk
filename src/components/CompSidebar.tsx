"use client"

import Link from 'next/link'
import {Apple, CalendarRange, ChartNoAxesColumn, ChartPie, ChevronDown, ChevronRight, CircleHelp,
        CircleUser, CookingPot, Goal, Menu, Power, PowerOff, Search, SlidersVertical, Star, Users } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import SignOut from './Sign-out'

interface CompSidebarProps {
  profile: {
    picture: string
    username: string
  }
}

const CompSidebar:FC<CompSidebarProps> = ({
  profile
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const [accord1, setAccord1] = useState<boolean>(false)
  const [accord2, setAccord2] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const sidebar = localStorage.getItem('sidebar');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    if (sidebar) {
      setIsExpanded(sidebar === 'false')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  }

  const expandSidebar = () => {
    const sidebar = isExpanded ? 'true' : 'false';
    setIsExpanded(!isExpanded);
    localStorage.setItem('sidebar', sidebar);
  }

  return (
    <div className={` ${ isExpanded ? 'max-w-72' : 'max-w-24' } w-full z-40 transition-width duration-200`}>
      <div className={`${ isExpanded ? 'w-72 overflow-y-auto scrollbar-hidden' : 'w-24' } py-2 border-r-2 border-[#d4e4ec] 
        dark:border-[#1c1c1c] dark:bg-[#201c1c] bg-[#fffcfc] h-full fixed top-0 left-0 transition-width duration-200`}
      >

      <div className={`relative h-16`}>
        <p
          onClick={expandSidebar} 
          className={`absolute top-4 left-[28px] ring-2 p-2 rounded-full cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]`}
        >
          <Menu />
        </p>
        { isExpanded ? (
          <p 
            className='p-2 rounded-full cursor-pointer absolute top-4 right-4 dark:hover:bg-[#222224] hover:bg-[#f0f4f4] '
            onClick={toggleTheme}
          >
            {isDarkMode ? (<Power />) : (<PowerOff />)}
          </p>
        ) : (
          null
        ) }
      </div>

      { isExpanded ? (
        <div className='px-4'>

          {/* profile */}
          <div className='flex gap-2 items-center p-2 mt-4 select-none'>
            <img src={profile.picture} className='rounded w-10 h-10' />
            <p className=' font-bold'>{profile.username}</p>
          </div>

          {/* planner community discover */}
          <div className='flex flex-col mt-4'>
            <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <CalendarRange />
              <span>Planner</span>
            </p>
            <Link href='/community' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <Users />
              <span>Community</span>
            </Link>
            <Link href='/generate-meal' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <Search />
              <span>Discover</span>
            </Link>
          </div>

          {/* custom-recipes collections */}
          <div className='flex flex-col mt-4'>
            <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <CookingPot  />
              <span >Custom recipes</span>
            </p>
            <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <Star  />
              <span className='my-auto'>Collections</span>
            </p>
          </div>

          {/* diet-nutritions stats weight settings */}
          <div className='mt-4 flex flex-col'>
            <div className='text-sm'>
              <p onClick={() => { setAccord1(!accord1) }} className='dark:hover:bg-[#222224] hover:bg-[#f0f4f4] p-2 flex gap-2 
                items-center rounded py-2 select-none cursor-pointer font-bold'
              >
                <ChartPie />
                <span>Diet & Nutrition</span>
                {accord1 ? (
                  <ChevronDown className='ml-auto transform transition-transform duration-300' />
                ) : (
                  <ChevronRight className='ml-auto transform transition-transform duration-300' />
                )}
              </p>
              <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${accord1 ? 'max-h-40 pl-4 pb-2' : 'max-h-0'}`}>
                <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Nutrition Targets</span>
                </p>
                <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Primary Diet</span>
                </p>
                <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Food Exclusions</span>
                </p>
                <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Rated Foods</span>
                </p>
              </div>
            </div>

            <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <ChartNoAxesColumn />
              <span>Physical Stats</span>
            </p>
            <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <Goal />
              <span>Weight and Goal</span>
            </p>
            <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <SlidersVertical />
              <span>Generator Settings</span>
            </p>
          </div>

          {/* account help */}
          <div className='mt-4'>
            <div className='text-sm'>
              <p onClick={() => {setAccord2(!accord2)}} className='dark:hover:bg-[#222224] hover:bg-[#f0f4f4] p-2 flex gap-2 items-center 
                rounded py-2 select-none cursor-pointer font-bold'
              >
                <CircleUser />
                <span>Account</span>
                {accord2 ? (
                  <ChevronDown className='ml-auto transform transition-transform duration-300' />
                ) : (
                  <ChevronRight className='ml-auto transform transition-transform duration-300' />
                )}
              </p>
              <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${accord2 ? 'max-h-40 pl-4 pb-2' : 'max-h-0'}`}>
                <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Credentials</span>
                </p>
                <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Notifications</span>
                </p>
                <Link href='followers' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Followers</span>
                </Link>
              </div>
            
            </div>

            <p className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <CircleHelp />
              <span>Help</span>
            </p>
          </div>

          <div className='mt-4'>
            <SignOut className='w-full p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
              dark:hover:bg-[#222224] hover:bg-[#f0f4f4] text-sm font-bold'>
              Log out
            </SignOut>
          </div>
        </div>
      ) : (
        <div className='relative px-2 mt-4 flex flex-col gap-8 h-full'>
          <div className='flex flex-col gap-4'>
            <p className='py-2 flex flex-col gap-2 items-center cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4] select-none text-sm font-bold rounded'>
              <CalendarRange />
              <span className='text-xs'>Planner</span>
            </p>

            <Link href='/community' className='py-2 flex flex-col gap-2 items-center cursor-pointer dark:hover:bg-[#222224] 
              hover:bg-[#f0f4f4] select-none text-sm font-bold rounded'>
              <Users />
              <span className='text-xs'>Community</span>
            </Link>

            <Link href='/generate-meal' className='py-2 flex flex-col gap-2 items-center cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4] select-none text-sm font-bold rounded'>
              <Search />
              <span className='text-xs'>Discover</span>
            </Link>        
          </div>

          <div className='p-2 absolute bottom-24 left-4 flex justify-center cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-boldrounded'>
            <Apple className='w-12 h-12' />
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default CompSidebar
