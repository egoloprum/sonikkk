"use client"

import { signInWithAnon } from '@/utils/supabase/signin'
import { Loader2, User } from 'lucide-react'
import { FC, useState } from 'react'

interface SignInAnonProps {
  className?: string
  children:   React.ReactNode
}

const SignInAnon: FC<SignInAnonProps> = ({
  className, children
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginAnon = async () => {
    try {
      setIsLoading(true)
      await signInWithAnon()
    } catch (error) { console.log(error) }
    finally { setIsLoading(false) }
  } 

  return (
    <button onClick={loginAnon} className={className}>
      <User />
      <span className=''>{children}</span>
      { isLoading ? (<Loader2 className='animate-spin h-4 w-4' />) : ( null ) }
    </button>
  )
}

export default SignInAnon
