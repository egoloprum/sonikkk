"use client"

import { FC, useState } from 'react'
import { signIn } from "next-auth/react"
import toast from 'react-hot-toast'
import { Loader2, LogIn } from 'lucide-react'

interface SignInProps {
  style: string
}

const SignIn: FC<SignInProps> = ({style}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function loginWithGoogle () {
    setIsLoading(true)
    
    try {
      await signIn('google')
    }
    catch (error) {
      console.log(error)
      toast.error('Something went wrong with your login.')
    } 
    finally {
      setIsLoading(false)
    }
  } 

  return <button onClick={loginWithGoogle} className={style}>
    <span className='text-md'>Login</span>
    {isLoading ? (
      <Loader2 className='animate-spin h-4 w-4' />
      ) : (
        <LogIn className='w-4 h-4' />
      )
    }
  </button>
}

export default SignIn
