"use client"

import { FC, useState } from 'react'
import { signIn } from "next-auth/react"
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

interface SignInProps {
  style: string
}

const SignIn: FC<SignInProps> = ({style}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true)
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
        null
      )
    }
  </button>
}

export default SignIn
