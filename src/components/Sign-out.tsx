"use client"

import { Loader2, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'

interface SignOutProps {
  className?: string
  children:   React.ReactNode
}

const SignOut: FC<SignOutProps> = ({ className, children }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)

  const handleSubmit = async () => {
    setIsSigningOut(true)
    try { await signOut() } 
    catch (error) { console.log(error); toast.error("There was a problem signing out") }
    finally { setIsSigningOut(false) }
  }

  return (
    <button className={className} 
      onClick={handleSubmit}
    >
      <LogOut />
      <span className=''>{children}</span>
      { isSigningOut ? (<Loader2 className='animate-spin h-4 w-4' />) : (null) }
    </button>
  )
}

export default SignOut;
