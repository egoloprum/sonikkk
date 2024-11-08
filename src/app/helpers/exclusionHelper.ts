import { supabase } from "@/lib/supabase"
import { QueryData } from "@supabase/supabase-js"

export const createExclusion = async (user_id: string) => {
  const { error } = await supabase
    .from('exclusions')
    .insert({ user_id: user_id })

  console.log("go")

  if (error) { return new Response('Invalid request', {status: 400}) }
  return new Response('OK', {status: 200}) 
}

export const getExclusion = async (user_id: string) => {
  const {data, error} = await supabase
    .from('exclusions')
    .select('user_id, list')
    .eq('user_id', user_id)
    .single() as QueryData<{ data: Exclusion }>

  if (error) {return null}
  return data as Exclusion
}

export const updateExclusion = async (user_id: string, list: string[]) => {
  const excluseExists = await getExclusion(user_id)

  if (!excluseExists) {
    await createExclusion(user_id)
  }

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
  const { data: excludedCount, error } = await supabase
    .rpc('get_meals_exclusion_count', {exclude_keywords: list}) as QueryData<{ data: number }>

  const { data: count } = await supabase
    .rpc('get_meals_count') as QueryData<{ data: number }>

  const percent = 100 - Math.round((excludedCount / count) * 100)

  if (error) { console.log('get exclusion count failed')
    return 0
  }

  return percent as number
}
