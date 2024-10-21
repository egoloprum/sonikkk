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
      <div className='max-w-[1200px] w-full flex flex-col gap-4'>

        {session ? (
          <div className='border-4 border-red-400 p-2 flex justify-between gap-4'>
            <div className='basis-1/3 flex items-center'>
              <Link className='flex gap-2 items-center w-fit p-2 hover:bg-gray-200 focus:bg-gray-200' href='/'>
                <Citrus />
                <p>Diet planner</p>
              </Link>
            </div>
            <div className='basis-1/3 flex items-center justify-center'>Calendar</div>
            <div className='basis-1/3 flex items-center'>
              <div className='ml-auto w-fit flex items-center'>
                <Bell className='h-6 w-6' />
                <DropdownMenu image={session?.user.image || null} />
              </div>
            </div>
          </div>
        ) : (
          null
        )}

        <div className='w-full flex place-content-between'>
          <Link className='border-2 border-black py-2 hover:bg-gray-200 focus:bg-gray-200 grow w-full text-center' href='/dashboard'>
            <span className='text-[0.95rem] font-light'>Dashboard</span>
          </Link>
          <Link className='border-2 border-black py-2 hover:bg-gray-200 focus:bg-gray-200 grow w-full text-center' href='/generate-meal'>
            <span className='text-[0.95rem] font-light'>Meal search</span> 
          </Link>
          <Link className='border-2 border-black py-2 hover:bg-gray-200 focus:bg-gray-200 grow w-full text-center' href='/blog'>
            <span className='text-[0.95rem] font-light'>Blog</span>
          </Link>
          <Link className='border-2 border-black py-2 hover:bg-gray-200 focus:bg-gray-200 grow w-full text-center' href='/plan'>
            <span className='text-[0.95rem] font-light'>Plan</span>
          </Link>
            
          {!session ? (
            <div className='border-2 border-black py-2 hover:bg-gray-200 focus:bg-gray-200 grow w-full text-center'>
              <SignIn style='flex gap-2 items-center justify-center w-full h-full' />
            </div>
          ) : (
            null
          )}

        </div>
      </div>
        
    </div>
  )
}

export default CompNavbar
