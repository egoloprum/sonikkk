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

export const recipeSavedGetByIds = async (recipes_ids: { recipe_id: string }[]) => {
  const savedRecipes: Recipe[] = (
    await Promise.all(
      recipes_ids.map(async (recipe_obj: { recipe_id: string }) => {
        const responseGetRecipe = await recipeGetById(recipe_obj.recipe_id)
        return responseGetRecipe
      })
    )
  ).filter((recipe): recipe is Recipe => recipe !== undefined)

  return savedRecipes
}

export const recipeLikedAll = async (user_id: string): Promise<Response> => {
  const { data: likedRecipes, error } = await supabase
    .from("recipeLiked")
    .select("recipe_id")
    .eq("user_id", user_id)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify(likedRecipes), { status: 200 })
};


export const recipeLikedAlready = async (recipe_id: string, user_id: string): Promise<Response> => {
  const { data: likedAlready, error } = await supabase
    .from('recipeLiked')
    .select('recipe_id, user_id')
    .eq('recipe_id', recipe_id)
    .eq('user_id', user_id)
    .single()

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  const responseData = {
    likedAlready: !!likedAlready
  }

  return new Response(JSON.stringify(responseData), { status: 200 })
}

export const recipeLikeAdd = async (recipe_id: string, user_id: string): Promise<Response> => {
  const data = {
    recipe_id: recipe_id,
    user_id: user_id
  }

  const response = await recipeLikedAlready(recipe_id, user_id)
  const responseData = await response.json()

  if (responseData.likedAlready) {
    return new Response(JSON.stringify({ success: false, message: "Recipe already liked." }), { status: 400 })
  }

  const { error } = await supabase
    .from('recipeLiked')
    .insert(data)

  if (error) {
    return new Response(JSON.stringify({ success: false, message: "Failed to add like.", error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ success: true, message: "Recipe liked successfully." }), { status: 200 })
}

export const recipeLikeRemove = async (recipe_id: string, user_id: string): Promise<Response> => {
  const response = await recipeLikedAlready(recipe_id, user_id)
  const responseData = await response.json()

  if (!responseData.likedAlready) {
    return new Response(JSON.stringify({ success: false, message: "Recipe not liked yet." }), { status: 400 });
  }

  const { error } = await supabase
    .from('recipeLiked')
    .delete()
    .eq('recipe_id', recipe_id)
    .eq('user_id', user_id);

  if (error) {
    return new Response(JSON.stringify({ success: false, message: "Failed to remove like.", error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ success: true, message: "Recipe like removed successfully." }), { status: 200 })
}

export const recipeSavedAll = async (user_id: string):  Promise<Response> => {
  const { data: savedRecipes, error } = await supabase
    .from('recipeSaved')
    .select('recipe_id')
    .eq('user_id', user_id)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify(savedRecipes), { status: 200 })
}

export const recipeSavedAlready = async (recipe_id: string, user_id: string): Promise<Response> => {
  const { data: savedAlready, error } = await supabase
    .from('recipeSaved')
    .select('recipe_id, user_id')
    .eq('recipe_id', recipe_id)
    .eq('user_id', user_id)
    .single()

  if (error) {
    return new Response(JSON.stringify({ success: false, message: "Error checking saved status.", error: error.message }), { status: 500 })
  }

  const responseData = {
    savedAlready: !!savedAlready
  }

  return new Response(JSON.stringify(responseData), { status: 200 })
}

export const recipeSaveAdd = async (recipe_id: string, user_id: string): Promise<Response> => {
  const data = {
    recipe_id: recipe_id,
    user_id: user_id
  }

  const response = await recipeSavedAlready(recipe_id, user_id)
  const responseData = await response.json();

  if (responseData.savedAlready) {
    return new Response(JSON.stringify({ success: false, message: "Recipe already saved." }), { status: 400 })
  }

  const { error } = await supabase
    .from('recipeSaved')
    .insert(data);

  if (error) {
    return new Response(JSON.stringify({ success: false, message: "Failed to save recipe.", error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ success: true, message: "Recipe saved successfully." }), { status: 200 })
}

export const recipeSaveRemove = async (recipe_id: string, user_id: string): Promise<Response> => {
  const response = await recipeSavedAlready(recipe_id, user_id)
  const responseData = await response.json()

  if (!responseData.savedAlready) {
    return new Response(JSON.stringify({ success: false, message: "Recipe not saved yet." }), { status: 400 })
  }

  const { error } = await supabase
    .from('recipeSaved')
    .delete()
    .eq('recipe_id', recipe_id)
    .eq('user_id', user_id)

  if (error) {
    return new Response(JSON.stringify({ success: false, message: "Failed to remove saved recipe.", error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ success: true, message: "Recipe save removed successfully." }), { status: 200 })
}
