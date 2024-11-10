"use client"

import { createNutritionTarget } from '@/app/helpers/nutritionHelper'
import { CirclePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface NutritionCreateProps {
  user_id: string
}


const NutritionCreate: FC<NutritionCreateProps> = ({user_id}) => {
  const router = useRouter()
  
  const handleNutritionCreate = async () => {
    try {
      const nutrition_id =  await createNutritionTarget(user_id)
      router.push(`/nutrition/${nutrition_id}`)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
      <p onClick={() => handleNutritionCreate()} 
        className="border-2 flex items-center gap-2 p-2 rounded w-full max-w-60 cursor-pointer hover:bg-black_extra">
        <CirclePlus />
        <span className="text-sm">Create Nutrition Target</span>
      </p>
    </>
  )
}

export default NutritionCreate
