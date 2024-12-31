"use client"

import { FC, useEffect, useState } from 'react'
import { submitLikedAction, submitSavedAction } from '@/app/actions/actions'
import { Ban, Pin } from 'lucide-react'
import RecipeLikeButton from './RecipeLikeButton'
import RecipeSaveButton from './RecipeSaveButton'
import toast from 'react-hot-toast'

interface RecipeFormProps {
  user_id: string 
  recipe_id: string
  likedAlready: boolean
  savedAlready: boolean
}

const RecipeForm: FC<RecipeFormProps> = ({
  user_id, recipe_id, likedAlready, savedAlready
}) => {
  const likedValue = likedAlready ? "true" : "false"
  const savedValue = savedAlready ? "true" : "false"

  const [likedState, setLikedState] = useState<boolean>(likedAlready)
  const [savedState, setSavedState] = useState<boolean>(savedAlready)

  useEffect(() => {
    if (likedState !== likedAlready) {
      if (likedState) { toast.success("unliked recipe") }
      else { toast.success("liked recipe") }

      setLikedState(likedAlready)
    }
  }, [likedAlready])

  useEffect(() => {
    if (savedState !== savedAlready) {
      if (savedState) { toast.success("unsaved recipe") }
      else { toast.success("saved recipe") }
      setSavedState(savedAlready)
    }
  }, [savedAlready])

  return (
    <div className='py-2 sm:py-4 max-w-64 flex gap-4 justify-between'>
      <form action="" className='rounded-full'>
        <button
          type='button' 
          className='border-2 p-2.5 rounded-full cursor-pointer dark:hover:bg-black_hover 
          hover:bg-white_hover dark:border-black_border'>
          <Pin className='w-5 h-5' />
        </button>
      </form>

      <form action={submitSavedAction} className='rounded-full'>
        <input type="hidden" name="savedUserId" className="hidden" defaultValue={user_id} />
        <input type="hidden" name="savedRecipeId" className="hidden" defaultValue={recipe_id} />
        <input type="hidden" name="savedAlready" className="hidden" defaultValue={savedValue} />

        <RecipeSaveButton savedValue={savedAlready} />
      </form>

      <form action={submitLikedAction} className='rounded-full'>
        <input type="hidden" name="likedUserId" className="hidden" defaultValue={user_id} />
        <input type="hidden" name="likedRecipeId" className="hidden" defaultValue={recipe_id} />
        <input type="hidden" name="likedAlready" className="hidden" defaultValue={likedValue} />

        <RecipeLikeButton likedValue={likedAlready} />
      </form>

      <form action="" className='rounded-full'>
        <button 
          type='button'
          className='border-2 p-2.5 rounded-full cursor-pointer dark:hover:bg-black_hover 
          hover:bg-white_hover dark:border-black_border'>
          <Ban className='w-5 h-5' />
        </button>
      </form>

    </div>
  )
}

export default RecipeForm
