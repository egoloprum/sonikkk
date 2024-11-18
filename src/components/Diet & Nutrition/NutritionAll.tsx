"use client"

import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface NutritionAllProps {
  nutritionTargets: NutritionTarget[]
}

const NutritionAll: FC<NutritionAllProps> = ({nutritionTargets}) => {
  const router = useRouter()

  return (
    <div className="py-4 flex flex-wrap gap-4 cursor-pointer">
    {nutritionTargets.map((target) => (
      <div onClick={() => { router.push(`/nutrition/${target.id}`); router.refresh() }} key={target.id} className="py-4 flex-1 hover:dark:bg-black_hover rounded
        hover:bg-white_hover px-2 flex flex-col gap-2 max-w-[300px] select-none">
        <p className="flex flex-col">
          <span className="whitespace-nowrap">{target.title}</span>
          <span className="text-xs sm:text-sm">{target.calories} Calories</span>
        </p>

        <p className="flex flex-col">
          <span className="text-black_text text-xs sm:text-sm">{target.carbs} Carbs</span>
          <span className="text-black_text text-xs sm:text-sm">{target.fats} Fats</span>
          <span className="text-black_text text-xs sm:text-sm">{target.protein} Protein</span>
        </p>
      </div>
    ))}
  </div>
  )
}

export default NutritionAll
