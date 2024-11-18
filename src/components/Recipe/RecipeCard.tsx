import Link from 'next/link'
import { FC } from 'react'
interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard: FC<RecipeCardProps> = ({recipe}) => {
  return (
    <Link href={`recipe/${recipe.recipe_id}`} className='rounded hover:dark:bg-black_hover hover:bg-white_hover 
      flex flex-row sm:flex-col gap-2 sm:gap-4 max-h-72
      cursor-pointer'>

      <div className='basis-1/2 overflow-hidden'>
        <img src={recipe.images.thumbnail || '/default_thumbnail_recipe.jpg'} className='w-full h-full rounded-t' alt="" loading='lazy' />
      </div>

      <div className='basis-1/2 p-2 pt-0 sm:p-4'>
        <p className='text-sm sm:text-base hover:underline mb-2'>{recipe.food_name}</p>
        <p className='text-xs sm:text-sm'>{recipe.nutritions.calories} calories</p>
        <p className='text-xs sm:text-sm'>{recipe.prep_time + recipe.cook_time} minutes</p>
      </div>
    </Link>
  )
}

export default RecipeCard
