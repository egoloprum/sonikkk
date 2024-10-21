import { supabase } from "@/lib/supabase"
import { QueryData } from "@supabase/supabase-js"

export const MealLikeAdd = async (user_id: string, meal_id: string) => {
  const likedMealData = {
    meal_id: meal_id,
    user_id: user_id
  }

  const { error } = await supabase
    .from('likedMeal')
    .insert(likedMealData)
    .select('*') as QueryData<{ mealLiked: object }[]>

  if (error) {
    return null
  }

  return true
} 

export const MealLikeRemove = async (user_id: string, meal_id: string) => {
  const {error} = await supabase
    .from('likedMeal')
    .delete()
    .eq('meal_id', meal_id)
    .eq('user_id', user_id)

  if (error) {
    return null
  }

  return true
}

export const MealIDByUser = async (user_id: string) => {
  const {data} = await supabase
    .from('likedMeal')
    .select('meal_id')
    .eq('user_id', user_id)

  return data as { meal_id: string }[]
}

export const MealSelector = async ( mealsLiked: {meal_id: string}[] ) => {
  const mealsList: Meal[] = await Promise.all(
    mealsLiked.map(async (meal) => {
      const { data } = await supabase
        .from('meal')
        .select('*')
        .eq('meal_id', meal.meal_id) as QueryData<{ data: Meal }>

      return data
    })
  );

  return mealsList
}

export const MealSelectAll = async (keyword: string) => {
  const { data, error } = await supabase.rpc('search_meal', { search_term: keyword }) as QueryData<{ data: Meal[] }>

  // const {data, error} = await supabase
  //   .from('meal')
  //   .select('*')
  //   .eq('name', keyword) as QueryData<{ data: Meal[] }>

  if (error) {
    return null
  }

  return data as Meal[]
}

export const MealSelectDetail = async (meal_id: string) => {
  const {data, error} = await supabase
    .from('meal')
    .select('*')
    .eq('meal_id', meal_id) as QueryData<{ data: Meal }>

  if (error) {
    return null
  }

  return data as Meal
}

// function isValidMeal(meal: Meal) {
//   return (
//     meal.meal_id &&
//     meal.name &&
//     meal.description &&
//     meal.thumbnail_url &&
//     Object.keys(meal.nutrition).length > 0 &&
//     meal.sections.length > 0 &&
//     meal.instructions.length > 0
//   );
// }
