import { getServerSession } from 'next-auth'
import SignIn from './Sign-in'
import SignOut from './Sign-out'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

const CompNavbar = async ({}) => {

  const session = await getServerSession(authOptions)

  return (
    <div className='bg-indigo-400 p-2 w-full flex justify-center gap-6'>
      <Link className='border-4 border-green-300 hover:border-red-300 w-[10rem] text-center' href='/'>
        Home
      </Link>
      <Link className='border-4 border-green-300 px-2 w-[10rem] text-center' href='/generate-meal'>
        Meal generate
      </Link>
      <Link className='border-4 border-green-300 px-2 w-[10rem] text-center' href='/blog'>
        Blog
      </Link>
      <div className='border-4 border-green-300 hover:border-red-300 w-[10rem] flex items-center justify-center'>
        
        {!session ? (
          <SignIn style='flex gap-2 items-center justify-center w-full' />
        ) : (
          <SignOut style='flex gap-2 items-center justify-center w-full' />
        )}
        
      </div>
    </div>
  )
}

export default CompNavbar
