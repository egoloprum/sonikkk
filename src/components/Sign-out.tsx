"use client"

import { signOut } from '@/utils/supabase/signin'
import { Loader2, LogOut } from 'lucide-react'

import { FC, useState } from 'react'

interface SignOutProps {
  className?: string
  children:   React.ReactNode
}

const SignOut: FC<SignOutProps> = ({ className, children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      signOut()
    } catch (error) { console.log(error) }
    finally { setIsLoading(false) }
  }

  return (
    <button className={className} onClick={handleSubmit}>
      <LogOut />
      <span className=''>{children}</span>
      { isLoading ? (<Loader2 className='animate-spin h-4 w-4' />) : (null) }
    </button>
  )
}

export default SignOut;
