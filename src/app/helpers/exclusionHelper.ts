import { createClient } from "@/utils/supabase"
import { QueryData } from "@supabase/supabase-js"

export const createExclusion = async (user_id: string) => {
    const supabase = await createClient()
  const { error } = await supabase
    .from('exclusions')
    .insert({ user_id: user_id })

  if (error) { return new Response('Invalid request', {status: 400}) }
  return new Response('OK', {status: 200}) 
}

export const getExclusion = async (user_id: string) => {
  const supabase = await createClient()
  const {data, error} = await supabase
    .from('exclusions')
    .select('user_id, list')
    .eq('user_id', user_id)
    .single() as QueryData<{ data: Exclusion }>

  if (error) {return null}
  return data as Exclusion
}

export const updateExclusion = async (user_id: string, list: string[]) => {
  if (!user_id) {
    return new Response('Invalid request', { status: 400 }) 
  }
  const excluseExists = await getExclusion(user_id)

  if (!excluseExists) {
    await createExclusion(user_id)
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('exclusions')
    .update({ list: list })
    .eq('user_id', user_id)

  if (error) { console.log('exclusion update failed')
    return new Response('Invalid request', { status: 400 }) 
  }

  console.log('exclusion update success')
  return new Response('OK', { status: 200 })
}

export const getExclusionCount = async (list: string[]) => {
  const supabase = await createClient()
  const { data: excludedCount, error } = await supabase
    .rpc('count_excluded_recipes', {exclude_keywords: list}) as QueryData<{ data: number }>

  const { data: count } = await supabase
    .rpc('get_recipe_count') as QueryData<{ data: number }>

  const percent = 100 - Math.round((excludedCount / count) * 100)

  if (error) { console.log('get exclusion count failed')
    return 0
  }

  return percent as number
}
