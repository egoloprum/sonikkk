import { supabase } from "@/lib/supabase"
import { QueryData } from "@supabase/supabase-js"

export const recipeSearch = async (keyword: string) => {
  const { data, error } = await supabase
    .rpc('search_recipe', { search_term: keyword }) as QueryData<{ data: Recipe[] }>

  if (error) { return null }
  return data as Recipe[]
}
