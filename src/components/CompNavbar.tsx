import { getServerSession } from 'next-auth'
import SignIn from './Sign-in'
import SignOut from './Sign-out'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

const CompNavbar = async ({}) => {

  const session = await getServerSession(authOptions)

  return (
    <div className='bg-indigo-400 p-2 flex justify-center w-full'>
      <div className='w-full max-w-[1200px] flex flex-wrap gap-4 place-content-between'>
        <Link className='btn max-w-[9rem] w-full text-center px-0' href='/'>
          <span className='text-[0.95rem] font-light'>Home</span>
        </Link>
        <Link className='btn max-w-[9rem] w-full text-center px-0' href='/generate-meal'>
          <span className='text-[0.95rem] font-light'>Meal generate</span> 
        </Link>
        <Link className='btn max-w-[9rem] w-full text-center px-0' href='/blog'>
          <span className='text-[0.95rem] font-light'>Blog</span>
        </Link>
          
        {!session ? (
          <div className='btn max-w-[9rem] text-[0.95rem] font-light w-full flex items-center justify-center px-0'>
            <SignIn style='flex gap-2 items-center justify-center w-full h-full' />
          </div>
        ) : (
          <>
            <Link className='btn max-w-[9rem] w-full text-center px-0' href='/profile'>
              <span className='text-[0.95rem] font-light'>Profile</span>
            </Link>
            <Link className='btn max-w-[9rem] w-full text-center px-0' href='/notifications'>
              <span className='text-[0.95rem] font-light'>Notifications</span>
            </Link>
            <Link className='btn max-w-[9rem] w-full text-center px-0' href='/followers'>
              <span className='text-[0.95rem] font-light'>Followers</span>
            </Link>
            <div className='btn max-w-[9rem] text-[0.95rem] font-light w-full flex items-center justify-center px-0'>
              <SignOut style='flex gap-2 items-center justify-center w-full h-full' />
            </div>
          </>
        )}

      </div>
        
    </div>
  )
}

export default CompNavbar
