import { supabase } from "@/lib/supabase"
import { QueryData } from "@supabase/supabase-js"

export const recipeSearch = async (keyword: string) => {
  const { data, error } = await supabase
    .from('recipe')
    .select('*')
    .or(`food_name.ilike.%${keyword}%,tag_cloud.ilike.%${keyword}%`) as QueryData<{ data: Recipe[] }>

  if (error) { return null }
  return data as Recipe[]
}

export const recipeGetById = async (recipe_id: string) => {
  const { data, error } = await supabase
    .from('recipe')
    .select('*')
    .eq('recipe_id', recipe_id)
    .single() as QueryData<{ data: Recipe }>

  if (error) {return null}  
  return data as Recipe
}
