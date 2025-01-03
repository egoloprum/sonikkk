"use client"

import Link from 'next/link'
import {Apple, CalendarRange, ChartNoAxesColumn, ChartPie, ChevronDown, ChevronRight, CircleHelp,
        CircleUser, CookingPot, Goal, Menu, Power, PowerOff, Search, SlidersVertical, Star, Users } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import SignOut from '../SignIn/Sign-out'
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();


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



  const expandSidebar = (condition: string) => {
    const viewportWidth = window.innerWidth;

    if ((condition == "SmallScreen" && viewportWidth < 640) || condition == "ExpandBtn") {
      const sidebar = isExpanded ? 'true' : 'false'
      setIsExpanded(!isExpanded)
      localStorage.setItem('sidebar', sidebar)
    }
  }

  return (
    <div className={` ${ isExpanded ? 'max-w-72' : 'max-w-28' } sm:w-full z-40 transition-width duration-200`}>
      <div className={`${ isExpanded ? 'sm:w-72 overflow-y-auto scrollbar-hidden h-screen' : 'sm:w-28' } py-2 sm:border-r-2 sm:border-white_hover dark:border-black_mid dark:bg-black_extra bg-white_extra sm:h-full w-full fixed sm:top-0 sm:left-0 bottom-0 transition-width duration-200`}
      >

      { isExpanded ? (
        <div className='px-4'>
          <div className='p-2 flex justify-between'>
            <p onClick={() => expandSidebar("ExpandBtn")} 
              className={`border-2 p-2 rounded-full cursor-pointer dark:hover:bg-black_hover hover:bg-white_hover`}
            >
              <Menu />
            </p>
            { isExpanded ? (
              <p onClick={toggleTheme} 
                className='p-2 rounded-full cursor-pointer dark:hover:bg-black_hover hover:bg-white_hover'
              > {isDarkMode ? (<Power />) : (<PowerOff />)}
              </p>
            ) : (null) }
          </div>

          {/* profile */}
          <div className='flex gap-2 items-center p-2 mt-4 select-none'>
            <img src={profile.picture} className='rounded w-10 h-10' alt={profile.username} />
            <p className=' font-bold'>{profile.username}</p>
          </div>

          {/* planner community discover */}
          <div className='flex flex-col mt-4'>
            <Link href='/planner' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-black_hover 
              hover:bg-white_hover text-sm font-bold ${pathname === '/planner' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <CalendarRange />
              <span>Planner</span>
            </Link>
            <Link href='/community' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-black_hover 
              hover:bg-white_hover text-sm font-bold ${pathname === '/community' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <Users />
              <span>Community</span>
            </Link>
            <Link href='/discover' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-black_hover 
              hover:bg-white_hover text-sm font-bold ${pathname === '/discover' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <Search />
              <span>Discover</span>
            </Link>
          </div>

          {/* custom-recipes collections */}
          <div className='flex flex-col mt-4'>
            <Link href='/custom-recipes' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-black_hover 
              hover:bg-white_hover text-sm font-bold ${pathname === '/custom-recipes' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <CookingPot  />
              <span >Custom recipes</span>
            </Link>
            <Link href='/collections' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer dark:hover:bg-black_hover 
              hover:bg-white_hover text-sm font-bold ${pathname === '/collections' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <Star  />
              <span className='my-auto'>Collections</span>
            </Link>
          </div>

          {/* diet-nutritions stats weight settings */}
          <div className='mt-4 flex flex-col'>
            <div className='text-sm'>
              <p onClick={() => { setAccord1(!accord1) }} className='dark:hover:bg-black_hover hover:bg-white_hover p-2 flex gap-2 
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
                <Link href='/nutrition' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
                  dark:hover:bg-black_hover hover:bg-white_hover ${pathname === '/nutrition' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
                  <span>Nutrition Targets</span>
                </Link>
                <Link href='/diet' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
                  dark:hover:bg-black_hover hover:bg-white_hover ${pathname === '/diet' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
                  <span>Primary Diet</span>
                </Link>
                <Link href='/exclusion' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
                  dark:hover:bg-black_hover hover:bg-white_hover ${pathname === '/exclusion' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
                  <span>Food Exclusions</span>
                </Link>
                <Link href='/rated' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
                  dark:hover:bg-black_hover hover:bg-white_hover ${pathname === '/rated' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
                  <span>Rated Foods</span>
                </Link>
              </div>
            </div>

            <Link href='/stats' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
              dark:hover:bg-black_hover hover:bg-white_hover text-sm font-bold ${pathname === '/stats' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <ChartNoAxesColumn />
              <span>Physical Stats</span>
            </Link>
            <Link href='/goal' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
              dark:hover:bg-black_hover hover:bg-white_hover text-sm font-bold ${pathname === '/goal' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <Goal />
              <span>Weight and Goal</span>
            </Link>
            <Link href='/generator' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
              dark:hover:bg-black_hover hover:bg-white_hover text-sm font-bold ${pathname === '/generator' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <SlidersVertical />
              <span>Generator Settings</span>
            </Link>
          </div>

          {/* account help */}
          <div className='mt-4'>
            <div className='text-sm'>
              <p onClick={() => {setAccord2(!accord2)}} className='dark:hover:bg-black_hover hover:bg-white_hover p-2 flex gap-2 items-center 
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
                <Link href='/account/credentials' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
                  dark:hover:bg-black_hover hover:bg-white_hover ${pathname === '/account/credentials' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
                  <span>Credentials</span>
                </Link>
                <Link href='/account/notifications' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
                  dark:hover:bg-black_hover hover:bg-white_hover ${pathname === '/account/notifications' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
                  <span>Notifications</span>
                </Link>
                <Link href='/account/followers' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
                  dark:hover:bg-black_hover hover:bg-white_hover ${pathname === '/account/followers' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
                  <span>Followers</span>
                </Link>
              </div>
            
            </div>

            <Link href='/help' onClick={() => expandSidebar("SmallScreen")} className={`p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
              dark:hover:bg-black_hover hover:bg-white_hover text-sm font-bold ${pathname === '/help' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <CircleHelp />
              <span>Help</span>
            </Link>
          </div>

          <div className='mt-4'>
            <SignOut className='w-full p-2 flex gap-2 items-center rounded py-2 select-none cursor-pointer 
              dark:hover:bg-black_hover hover:bg-white_hover text-sm font-bold'>
              Log out
            </SignOut>
          </div>
        </div>
      ) : (
        <div className='px-2 sm:mt-4 flex flex-col gap-8 h-full'>
          <div className='flex sm:flex-col justify-between gap-4 px-2'>
            <p onClick={() => expandSidebar("ExpandBtn")} className='basis-1/4 sm:border-2 order-last sm:order-first flex flex-col gap-2 sm:gap-0 w-full sm:justify-center items-center sm:p-2 py-4 rounded sm:rounded-full cursor-pointer dark:hover:bg-black_hover hover:bg-white_hover font-bold'
            >
              <Menu />
              {/* <span className='text-[3vw] sm:hidden block'>Menu</span> */}
            </p>

            <Link href='/planner' className={`basis-1/4 py-4 w-full flex flex-col gap-2 items-center cursor-pointer dark:hover:bg-black_hover hover:bg-white_hover select-none text-sm font-bold rounded ${pathname === '/planner' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <CalendarRange />
              <span className='text-[3vw] sm:text-xs hidden sm:inline'>Planner</span>
            </Link>

            <Link href='/community' className={`basis-1/4 py-4 px-1 w-full flex flex-col gap-2 items-center cursor-pointer dark:hover:bg-black_hover hover:bg-white_hover select-none text-sm font-bold rounded ${pathname === '/community' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <Users />
              <span className='text-[3vw] sm:text-xs hidden sm:inline'>Community</span>
            </Link>

            <Link href='/discover' className={`basis-1/4 py-4 w-full flex flex-col gap-2 items-center cursor-pointer dark:hover:bg-black_hover hover:bg-white_hover select-none text-sm font-bold rounded ${pathname === '/discover' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
              <Search />
              <span className='text-[3vw] sm:text-xs hidden sm:inline'>Discover</span>
            </Link>        
          </div>

          <Link href='/planner' className={`hidden p-2 w-full mt-auto mb-8 sm:flex justify-center cursor-pointer dark:hover:bg-black_hover hover:bg-white_hover text-sm font-boldrounded ${pathname === '/planner' ? 'dark:bg-black_hover bg-white_hover' : ''}`}>
            <Apple className='w-12 h-12' />
          </Link>
        </div>
      )}
      </div>
    </div>
  )
}

export default CompSidebar
