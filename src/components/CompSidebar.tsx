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
    <div className={` ${ isExpanded ? 'max-w-72' : 'max-w-28' } sm:w-full z-40 transition-width duration-200`}>
      <div className={`${ isExpanded ? 'sm:w-72 overflow-y-auto scrollbar-hidden h-screen' : 'sm:w-28' } py-2 sm:border-r-2 sm:border-[#d4e4ec] 
        dark:border-[#1c1c1c] dark:bg-[#201c1c] bg-[#fffcfc] sm:h-full w-full fixed sm:top-0 sm:left-0 bottom-0 transition-width duration-200`}
      >

      { isExpanded ? (
        <div className='px-4'>
          <div className='p-2 flex justify-between'>
            <p onClick={expandSidebar} 
              className={`border-2 p-2 rounded-full cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]`}
            >
              <Menu />
            </p>
            { isExpanded ? (
              <p onClick={toggleTheme} 
                className='p-2 rounded-full cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4] '
              > {isDarkMode ? (<Power />) : (<PowerOff />)}
              </p>
            ) : (null) }
          </div>

          {/* profile */}
          <div className='flex gap-2 items-center p-2 mt-4 select-none'>
            <img src={profile.picture} className='rounded w-10 h-10' />
            <p className=' font-bold'>{profile.username}</p>
          </div>

          {/* planner community discover */}
          <div className='flex flex-col mt-4'>
            <Link href='/planner' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <CalendarRange />
              <span>Planner</span>
            </Link>
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
            <Link href='/custom-recipes' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <CookingPot  />
              <span >Custom recipes</span>
            </Link>
            <Link href='/collections' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <Star  />
              <span className='my-auto'>Collections</span>
            </Link>
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
                <Link href='/nutrition' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Nutrition Targets</span>
                </Link>
                <Link href='/diet' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Primary Diet</span>
                </Link>
                <Link href='/exclusion' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Food Exclusions</span>
                </Link>
                <Link href='/rated' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Rated Foods</span>
                </Link>
              </div>
            </div>

            <Link href='/stats' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <ChartNoAxesColumn />
              <span>Physical Stats</span>
            </Link>
            <Link href='/goal' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <Goal />
              <span>Weight and Goal</span>
            </Link>
            <Link href='/generator' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <SlidersVertical />
              <span>Generator Settings</span>
            </Link>
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
                <Link href='/account/credentials' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Credentials</span>
                </Link>
                <Link href='/account/notifications' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Notifications</span>
                </Link>
                <Link href='/account/followers' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]'>
                  <span>Followers</span>
                </Link>
              </div>
            
            </div>

            <Link href='/help' className='p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-bold'>
              <CircleHelp />
              <span>Help</span>
            </Link>
          </div>

          <div className='mt-4'>
            <SignOut className='w-full p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
              dark:hover:bg-[#222224] hover:bg-[#f0f4f4] text-sm font-bold'>
              Log out
            </SignOut>
          </div>
        </div>
      ) : (
        <div className='px-2 mt-4 flex flex-col gap-8 h-full'>
          <div className='flex sm:flex-col justify-between gap-4 px-2'>
            <p onClick={expandSidebar} 
              className='sm:border-2 order-last sm:order-first flex flex-col gap-2 sm:gap-0 w-full sm:justify-center items-center sm:p-2 py-2 rounded-full cursor-pointer 
              dark:hover:bg-[#222224] hover:bg-[#f0f4f4] font-bold'
            >
              <Menu />
              <span className='text-xs sm:hidden block'>Menu</span>
            </p>

            <Link href='/planner' className='py-2 w-full flex flex-col gap-2 items-center cursor-pointer dark:hover:bg-[#222224] 
              hover:bg-[#f0f4f4] select-none text-sm font-bold rounded'>
              <CalendarRange />
              <span className='text-xs'>Planner</span>
            </Link>

            <Link href='/community' className='py-2 w-full flex flex-col gap-2 items-center cursor-pointer dark:hover:bg-[#222224] 
              hover:bg-[#f0f4f4] select-none text-sm font-bold rounded'>
              <Users />
              <span className='text-xs'>Community</span>
            </Link>

            <Link href='/generate-meal' className='py-2 w-full flex flex-col gap-2 items-center cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4] select-none text-sm font-bold rounded'>
              <Search />
              <span className='text-xs'>Discover</span>
            </Link>        
          </div>

          <Link href='/planner' className='hidden p-2 w-full mt-auto mb-8 sm:flex justify-center cursor-pointer dark:hover:bg-[#222224] hover:bg-[#f0f4f4]  text-sm font-boldrounded'>
            <Apple className='w-12 h-12' />
          </Link>
        </div>
      )}
      </div>
    </div>
  )
}

export default CompSidebar
