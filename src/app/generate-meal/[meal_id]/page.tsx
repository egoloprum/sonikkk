import MealDetail from '@/components/Meal/MealDetail'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { FC } from 'react'

interface pageProps {
  params: {
    meal_id: string
  }
}
  
const page:FC<pageProps> = async ({ params }) => {
  const { meal_id } = params
  const session = await getServerSession(authOptions)
  const user_id: string | null = session?.user.id ?? null

  const { data: likedExists } = await supabase
    .from('likedMeal')
    .select('*')
    .eq('meal_id', meal_id)
    .eq('user_id', user_id)
    .single()

  const alreadyLiked = likedExists ? true : false

  return (
    <div>    
      <MealDetail meal_id={meal_id} alreadyLiked={alreadyLiked} user_id={user_id} />
    </div>

  )
}

export default page
