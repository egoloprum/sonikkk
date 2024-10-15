import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { MealIDByUser, MealSelector } from '../helpers/mealHelper'
import Link from 'next/link'

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions)

  if (!session) { notFound() }

  const mealsLikedID = await MealIDByUser(session.user.id)
  const mealsLiked = await MealSelector(mealsLikedID)

  // {console.log(mealsLiked)}

  return (

    <div>
      {session.user.name}

      <div className='border-4 border-yellow-500 p-4'>

        <p>Meals you liked: </p>


        {mealsLiked.flat().map((meal: Meal) => (
          <div key={meal.meal_id} className='border-4 border-red-300 my-4 p-4'>

            <Link href={`generate-meal/${meal.meal_id}`}>{meal.name}</Link>

            <p>{meal.name}</p>
            <p>{meal.meal_id}</p>

          </div>
        ))}

      </div>

      <div className='border-4 border-gray-500 p-4 mt-4'>

        <p>Meals you added: </p>

      </div>

      


      
    </div>


  )
}

export default page
