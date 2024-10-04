import MealSearch from '@/components/MealSearch';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions)

  return (
    <div className='border-4 border-red-300 flex justify-center'>
      <div className='border-4 border-blue-300 w-full m-4 mx-10 p-4'>
        <p className='text-xl font-bold'>Generate meal</p>

        <MealSearch sessionId={session?.user.id} />

      </div>
    </div>
  )
}

export default page
