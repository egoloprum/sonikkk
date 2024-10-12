import { supabase } from "@/lib/supabase"
import { QueryData } from "@supabase/supabase-js"

export const MealExists = async (meal_id: string) => {
  const { data: mealExists, error } = await supabase.from('meal').select('*').eq('meal_id', meal_id).single()
  // console.log(`${mealExists} meal exists`)

  if (error) {
    return null
  }
  
  return mealExists.meal_id
}

export const MealCreator = async (meal: Meal) => {
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

  const { data: mealCreated, error } = await supabase
    .from('meal')
    .insert(mealData)
    .select('meal_id') as QueryData<{ mealCreated: string }[]>

  const newMealCreated: { meal_id: string } = mealCreated[0]
  console.log(`${newMealCreated.meal_id} ${mealCreated ? ('meal created') : ('meal create error')}`)

  if (error) {
    return new Response('Error at MealCreator', {status: 400})
  }

  return { mealCreated: true, meal_id: newMealCreated.meal_id }
}

export const MealLikeAdd = async (user_id: string, meal_id: string) => {
  const likedMealData = {
    meal_id: meal_id,
    user_id: user_id
  }

  const { data: mealLiked } = await supabase
    .from('likedMeal')
    .insert(likedMealData)
    .select('*') as QueryData<{ mealLiked: object }[]>

  const newMealLiked: { liked_id: string; user_id: string; meal_id: string  } = mealLiked[0]
  console.log(`${newMealLiked.liked_id} ${newMealLiked.user_id} ${newMealLiked.meal_id} ${mealLiked ? ('meal liked') : ('meal create error')}`)

  return { mealLiked }
} 

export const MealLikeRemove = async (user_id: string, meal_id: string) => {
  const {data, error} = await supabase
    .from('likedMeal')
    .delete()
    .eq('meal_id', meal_id)
    .eq('user_id', user_id)

  return {data}
}

export const MealSelectByUser = async (user_id: string) => {
  const {data} = await supabase
    .from('likedMeal')
    .select('*')
    .eq('user_id', user_id)

  return {data}
}
