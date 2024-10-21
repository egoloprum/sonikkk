import MealSearch from '@/components/Meal/MealSearch'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions)

  return (
    <div className='flex flex-col justify-center'>
      <MealSearch sessionId={session?.user.id} />
    </div>
  )
}

export default page
