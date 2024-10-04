import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase"
import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const meal = await req.json()
    const session = await getServerSession(authOptions)
    const { data: mealExists } = await supabase.from('meal').select('*').eq('meal_id', meal.id).single()

    if (!session) {
      console.log("User is not authenticated")
      return new Response("Invalid request", { status: 400 })
    }

    if (!mealExists) {
      const mealData = {
        meal_id:            meal.id,
        name:               meal.name,
        description:        meal.description,
        thumbnail_url:      meal.thumbnail_url,
        nutrition:          meal.nutrition,
        sections:           meal.sections,
        instructions:       meal.instructions,
        prep_time_minutes:  meal.prep_time_minutes,
        cook_time_minutes:  meal.cook_time_minutes
      }

      const { data: mealCreated } = await supabase
        .from('meal')
        .insert(mealData)
        .select('meal_id') as QueryData<{ mealCreated: string }[]>

      const newMealCreated: { meal_id: string } = mealCreated[0]
      console.log(`${newMealCreated.meal_id} ${mealCreated ? ('meal created') : ('meal create error')}`)

      if (mealCreated && newMealCreated.meal_id) {

        const likedMealData = {
          meal_id: newMealCreated.meal_id,
          user_id: session.user.id
        }
  
        const { data: mealLiked } = await supabase
          .from('likedMeal')
          .insert(likedMealData)
          .select('*') as QueryData<{ mealLiked: object }[]>

        const newMealLiked: { liked_id: string; user_id: string; meal_id: string  } = mealLiked[0]

        console.log(`${newMealLiked.liked_id} ${newMealLiked.user_id} ${newMealLiked.meal_id} ${mealLiked ? ('meal created') : ('meal create error')}`)

        return new Response(
          mealLiked ? 
            "OK" : 
            "Invalid request",
          {
            status: mealLiked ? 200 : 400
          }
        )
      }
    }
    
    console.log(`${mealExists.meal_id} meal exists`)

    const likedMealData = {
      meal_id: mealExists.meal_id,
      user_id: session.user.id
    }

    const { data: mealLiked } = await supabase
      .from('likedMeal')
      .insert(likedMealData)
      .select('*') as QueryData<{ mealLiked: object }[]>

    console.log(`mealLiked ${JSON.stringify(mealLiked)}`)

    const newMealLiked: { liked_id: string; user_id: string; meal_id: string  } = mealLiked[0]
    console.log(`${newMealLiked.liked_id} ${newMealLiked.user_id} ${newMealLiked.meal_id} ${mealLiked ? ('meal created') : ('meal create error')}`)

    return new Response(
      mealLiked ? 
        "OK" : 
        "Invalid request",
      {
        status: mealLiked ? 200 : 400
      }
    )

  } catch (error) {
    console.log(error)

    return new Response('Invalid request', { status: 400 })
  }
}




