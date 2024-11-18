"use client"

import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import RecipeCard from './RecipeCard'

interface RecipeTableProps {
  recipeData: Recipe[] | null
  query: string | null
}

const RecipeTable: FC<RecipeTableProps> = ({recipeData, query}) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)

  useEffect(() => {
    setRecipes(recipeData)

    if (!recipeData?.length && query?.length) {
      console.log(query?.length)
      toast.error("No data qwe")
    }

  }, [recipeData])

  return (
    <div className='py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {recipes?.map((recipe: Recipe) => (
        <RecipeCard key={recipe.recipe_id} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeTable
