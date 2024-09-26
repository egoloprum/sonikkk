import { getServerSession } from 'next-auth'
import SignIn from './Sign-in'
import SignOut from './Sign-out'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

const CompNavbar = async ({}) => {

  const session = await getServerSession(authOptions)

  return (
    <div className='bg-indigo-400 p-2 w-full flex flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap justify-center gap-6 px-4'>
      <Link className='btn max-w-[10rem] w-full text-center' href='/'>
        <span className='text-[1.1rem]'>Home</span>
      </Link>
      <Link className='btn max-w-[10rem] w-full text-center' href='/generate-meal'>
        <span className='text-[1.1rem]'>Meal generate</span> 
      </Link>
      <Link className='btn max-w-[10rem] w-full text-center' href='/blog'>
        <span className='text-[1.1rem]'>Blog</span>
      </Link>
      <div className='btn max-w-[10rem] text-[1.1rem] w-full flex items-center justify-center'>
        
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