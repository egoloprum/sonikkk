import { supabase } from "@/lib/supabase"
import { QueryData } from "@supabase/supabase-js";


export const createNutritionTarget = async (user_id: string) => {
  const { data, error } = await supabase
    .from('nutritionTarget')
    .insert({ user_id: user_id, title: 'My Nutrition Target',
      calories: 0, carbs: 0, fats: 0, protein: 0, fiber: 0
     })
    .select('id')
  
    if (error) {
    console.error('Error creating nutrition target:', error)
    throw new Error('Failed to create nutrition target')
  }

  if (!data || data.length === 0) {
    throw new Error('No data returned');
  }

  return data[0].id as string
}

export const getNutritionAll = async (user_id: string) => {
  const {data, error} = await supabase
    .from('nutritionTarget')
    .select('*')
    .eq('user_id', user_id) as QueryData<{ data: NutritionTarget[] }>

  if (error) {
    console.error('Error getting all nutrition targets:', error)
    throw new Error('Failed to get nutrition targets')
  }

  return data as NutritionTarget[]
}

export const getNutrition = async (nutrition_id: string) => {
  const {data, error} = await supabase
    .from('nutritionTarget')
    .select('*')
    .eq('id', nutrition_id) as QueryData<{ data: NutritionTarget }>

  if (error) {
    console.error('Error getting nutrition target:', error)
    throw new Error('Failed to get nutrition target')
  }

  return data[0] as NutritionTarget
}

export const deleteNutritionTarget = async (nutrition_id: string) => {
  const  {error } = await supabase
  .from('nutritionTarget')
  .delete()
  .eq('id', nutrition_id)

  if (error) {
    console.error('Error deleting nutrition target:', error)
    throw new Error('Failed to delete nutrition target')
  }
  return true
}

export const saveNutritionTarget = async (nutrition: NutritionTarget) => {
  const { error } = await supabase
    .from('nutritionTarget')
    .update({ title: nutrition.title, calories: nutrition.calories, carbs: nutrition.carbs,
        fats: nutrition.fats, protein: nutrition.protein, fiber: nutrition.fiber
      })
    .eq('id', nutrition.id)
    .select()

  if (error) {
    console.error('Error updating nutrition target:', error)
    throw new Error('Failed to update nutrition target')
  }

  return true
}
