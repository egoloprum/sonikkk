"use client"

import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import MealCard from './MealCard'

interface MealDetailProps {
  meal_id: string
  user_id: string | null
  alreadyLiked: boolean
}

const MealDetail: FC<MealDetailProps> = ({
  meal_id, alreadyLiked, user_id
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const [searchResult, setSearchResult] = useState<Meal>()
  const [isAlreadyLiked, setIsAlreadyLiked] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)

      const response = await axios.post('/api/meal/each', { "meal_id": meal_id })
      const responseData = response.data[0]

      setSearchResult(responseData)

    } catch (error) {
      console.error(error)
      setSearchResult({} as Meal)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    setIsAlreadyLiked(alreadyLiked)
  }, [])

  const handleLikeAdd = async () => {
    if (!user_id) {
      toast.error("Go login")
      return
    }

    if (isAlreadyLiked) { 
      toast.error("Meal is already saved.")
      return
    }

    try {
      setBtnLoading(true)

      await axios.post('/api/meal/liked/add', JSON.stringify(searchResult))
      toast.success("Meal is saved successfully.")

      setIsAlreadyLiked(true)

    } catch (error) {
      console.log(error)
      toast.error("There was a problem liking meal.")
    }
    finally {
      setBtnLoading(false)
    }
  }

  const handleLikeRemove = async () => {
    if (!user_id) {
      toast.error("Go login")
      return
    }
    try {
      setBtnLoading(true)

      await axios.post('/api/meal/liked/remove', JSON.stringify(searchResult))
      toast.success("Meal is removed successfully.")

      setIsAlreadyLiked(false)

    } catch (error) {
      console.log(error)
      toast.error("There was a problem unsaving meal.")
    }
    finally {
      setBtnLoading(false)
    }
  }

  return (
    <div className=''>
      {isLoading ? (
        <Loader2 className='animate-spin h-4 w-4' />
      ) : (
        !searchResult ? (
          <div>Nothing to show</div>
        ) : (
          <div className='flex flex-col gap-4'>
            <div className='flex gap-4 flex-col lg:flex-row'>

              <div className='md:basis-4/5'>
                <MealCard whereRendered={false} key={searchResult.meal_id} mealDetail={searchResult} />
              </div>

              <div 
                className='md:basis-1/5 border-4 border-green-300 rounded-xl lg:my-4 p-4 flex flex-col md:flex-row lg:flex-col gap-4'
              >
                <p className='w-full font-medium text-sm md:text-base'>{searchResult.description}</p>

                {isAlreadyLiked ? 
                  <button onClick={handleLikeRemove} className='outline max-w-[12.5rem] w-full mt-auto'>
                    {btnLoading ? (<Loader2 className='animate-spin h-4 w-4' />) : 
                      (<span>Remove</span>)
                    }
                  </button>
                  : (
                  <button onClick={handleLikeAdd} className='outline max-w-[12.5rem] w-full mt-auto'>
                    {btnLoading ? (<Loader2 className='animate-spin h-4 w-4' />) : 
                      (<span>Save</span>)
                    }
                  </button>
                )}

              </div>
            </div>

            <div className='flex gap-4 flex-col md:flex-row'>
              <div className='basis-1/3 border-4 border-green-400 rounded-xl p-4 font-medium text-sm md:text-base'>
                <p className='text-black text-xl sm:text-2xl md:text-3xl mb-4 underline'>Ingredients</p>

                { searchResult.sections ? (
                  searchResult.sections[0].components.map((ingredient: {raw_text: string}) => {
                    return(
                      <>
                        <p key={ingredient.raw_text} className='my-2'>{ingredient.raw_text}</p>
                      </>
                    )
                  })
                ) : (
                  null
                ) }
              </div>

              <div className='basis-1/3 border-4 border-green-400 rounded-xl p-4 font-medium text-sm md:text-base'>
                <p className='text-black text-xl sm:text-2xl md:text-3xl mb-4 underline'>Nutrients</p>

              </div>

              <div className='basis-1/3 border-4 border-green-400 rounded-xl p-4 font-medium text-sm md:text-base'>
                <p className='text-black text-xl sm:text-2xl md:text-3xl mb-4 underline'>Instructions</p>

                {searchResult.instructions ? (
                  searchResult.instructions.map((instruction) => (
                    <p className='my-2' key={instruction.display_text}>
                      {instruction.display_text}
                    </p>
                  ))
                ) : null}
              </div>
            </div>

          </div>
        )
      )}

    </div>
  )
}

export default MealDetail
