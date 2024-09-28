"use client"

import { Loader2, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'

interface SignOutProps {
  style: string
}

const SignOut: FC<SignOutProps> = ({style}) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)


  return (
    <button className='flex gap-2 items-center justify-center w-full' 
      onClick={async () => {
        setIsSigningOut(true)
        try {
          await signOut()
        } catch (error) {
          toast.error("There was a problem signing out")
        }
        finally {
          setIsSigningOut(false)
        }
      }}
    >
      <span className='text-center'>Signout</span>
      {isSigningOut ? (
        <Loader2 className='animate-spin h-4 w-4' />
        ) : (
          <LogOut className='w-4 h-4' />
        )
      }
    </button>
  )
}

export default SignOut;
