import MealDetail from '@/components/MealDetail'
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

  const { data: likedExists } = await supabase
    .from('likedMeal')
    .select('*')
    .eq('meal_id', meal_id)
    .eq('user_id', session?.user.id)
    .single()

  console.log(`${likedExists} likedExists`)

  const alreadyLiked = likedExists ? true : false

  return (
    <div>    
      <MealDetail meal_id={meal_id} alreadyLiked={alreadyLiked}  />
    </div>

  )
}

export default page
