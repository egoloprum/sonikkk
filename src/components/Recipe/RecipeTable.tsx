"use client"

import { FC, useEffect, useState } from 'react'

interface RecipeTableProps {
  recipeData: Recipe[] | null
}

const RecipeTable: FC<RecipeTableProps> = ({recipeData}) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)

  useEffect(() => {
    setRecipes(recipeData)
    console.log(recipeData?.length)
  }, [recipeData])


  return (
    <div className='py-4 border-2 flex gap-4 flex-wrap'>
      {recipes?.map((recipe: Recipe) => (
        <div key={recipe.food_name} className='p-4 border-2'>
          {recipe.food_name}
        </div>
      ))}
    </div>
  )
}

export default RecipeTable
