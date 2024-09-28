import MealDetail from '@/components/MealDetail'
import { authOptions } from '@/lib/auth'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { FC } from 'react'

interface pageProps {
  params: {
    mealId: string
  }
}
  
const page:FC<pageProps> = async ({ params }) => {
  const { mealId } = params

  const session = await getServerSession(authOptions)

  return (
    <div>
      id: {mealId}
    
      <MealDetail mealId={mealId} />
    </div>

  )
}

export default page
