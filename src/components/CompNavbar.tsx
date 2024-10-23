import { getServerSession } from 'next-auth'
import SignIn from './Sign-in'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { Bell, Citrus } from 'lucide-react'
import DropdownMenu from './Dropdown'

const CompNavbar = async ({}) => {

  const session = await getServerSession(authOptions)

  return (
    <div className='flex justify-center w-full'>
      <div className='max-w-[1200px] w-full flex flex-col gap-2'>

        {session ? (
          <div className='p-2 flex justify-between gap-4'>
            <div className='basis-2/5 flex items-center'>
              <Link className='flex gap-2 items-center w-fit sm:p-2 p-1 hover:bg-gray-200 focus:bg-gray-200 ' href='/'>
                <Citrus />
                <p className='text-xs sm:text-sm md:text-base'>Diet planner</p>
              </Link>
            </div>
            <div className='basis-1/5 flex items-center justify-center'>
              <p className='text-xs sm:text-sm md:text-base'>Calendar</p>
            </div>
            <div className='basis-2/5 flex items-center'>
              <div className='ml-auto w-fit flex items-center'>
                <Bell className='h-5 w-5' />
                <DropdownMenu image={session?.user.image || null} />
              </div>
            </div>
          </div>
        ) : (
          null
        )}

        <div className='w-full flex place-content-between'>
          <Link className='border-2 border-black sm:py-2 py-1 hover:bg-gray-200 focus:bg-gray-200 grow w-full text-center' href='/dashboard'>
            <span className='text-xs sm:text-sm md:text-base font-light'>Dashboard</span>
          </Link>
          <Link className='border-2 border-black sm:py-2 py-1 hover:bg-gray-200 focus:bg-gray-200 grow w-full text-center' href='/generate-meal'>
            <span className='text-xs sm:text-sm md:text-base font-light'>Meal search</span> 
          </Link>
          <Link className='border-2 border-black sm:py-2 py-1 hover:bg-gray-200 focus:bg-gray-200 grow w-full text-center' href='/blog'>
            <span className='text-xs sm:text-sm md:text-base font-light'>Blog</span>
          </Link>
          <Link className='border-2 border-black sm:py-2 py-1 hover:bg-gray-200 focus:bg-gray-200 grow w-full text-center' href='/plan'>
            <span className='text-xs sm:text-sm md:text-base font-light'>Plan</span>
          </Link>
            
          {!session ? (
            <div className='border-2 border-black py-2 hover:bg-gray-200 focus:bg-gray-200 grow w-full text-center'>
              <SignIn style='flex gap-2 items-center justify-center w-full h-full' />
            </div>) : 
            ( null )
          }

        </div>
      </div>
        
    </div>
  )
}

export default CompNavbar
