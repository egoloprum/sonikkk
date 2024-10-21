"use client"

import { Loader2 } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'

interface SignOutProps {
  className?: string
  role?:      string
  tabIndex?:  number
  id?:        string
  children:   React.ReactNode
}

const SignOut: FC<SignOutProps> = ({ children }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)

  const handleSubmit = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
    } catch (error) {
      console.log(error)
      toast.error("There was a problem signing out")
    }
    finally {
      setIsSigningOut(false)
    }
  }

  return (
    <button className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full flex items-center gap-2' 
      onClick={handleSubmit}
    >
      <span className=''>{children}</span>
      {isSigningOut ? (
        <Loader2 className='animate-spin h-4 w-4' />
        ) : (
          null
        )
      }
    </button>
  )
}

export default SignOut;
