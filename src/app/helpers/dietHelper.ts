import { supabase } from "@/lib/supabase"
import { QueryData } from "@supabase/supabase-js"


export const createPrimaryDiet = async (user_id: string) => {
  const { error } = await supabase
    .from('primaryDiet')
    .insert({ user_id: user_id, diet_type: 'Anything' })

  if (error) { return new Response('Invalid request', {status: 400}) }
  return new Response('OK', {status: 200}) 
}

export const getPrimaryDiet = async (user_id: string) => {
  const {data, error} = await supabase
    .from('primaryDiet')
    .select('user_id, diet_type')
    .eq('user_id', user_id)
    .single() as QueryData<{ data: PrimaryDiet }>

  if (error) {return null}
  return data as PrimaryDiet
}

export const updatePrimaryDiet = async (user_id: string, diet_type: string) => {
  const dietExists = await getPrimaryDiet(user_id)

  if (!dietExists) {
    await createPrimaryDiet(user_id)
  }

  const { error } = await supabase
    .from('primaryDiet')
    .update({ diet_type: diet_type })
    .eq('user_id', user_id)

  if (error) { console.log('primary diet update failed')
    return new Response('Invalid request', { status: 400 }) 
  }

  console.log('primary diet update success')
  return new Response('OK', { status: 200 })
}
