import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { MealIDByUser, MealSelector } from '../helpers/mealHelper'
import MealCard from '@/components/Meal/MealCard'

const page = async ({}) => {
  const session = await getServerSession(authOptions)

  if (!session) { notFound() }

  const mealsLikedID  = await MealIDByUser(session.user.id)
  const mealsLiked    = await MealSelector(mealsLikedID)

  console.log(session.user)

  return (

    <div>
      {session.user.name}

      <div className=''>
        <p className='my-4'>Meals you liked: </p>

        <div className='grid gap-4'>
          {mealsLiked.flat().map((meal: Meal) => (
            <MealCard whereRendered={true} key={meal.meal_id} mealDetail={meal} />
          ))}
        </div>
      </div>

      <div className='border-4 border-gray_border p-4 mt-4'>
        <p>Meals you added: </p>
      </div>
    </div>
  )
}

export default page
