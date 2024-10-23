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
    } 
    catch (error) { console.error(error); setSearchResult({} as Meal) }
    finally { setIsLoading(false) }
  }

  useEffect(() => {
    fetchData()
    setIsAlreadyLiked(alreadyLiked)
  }, [])

  const handleLikeAdd = async () => {
    if (!user_id) { toast.error("Go login"); return }
    if (isAlreadyLiked) { toast.error("Meal is already saved."); return }

    try {
      setBtnLoading(true)

      await axios.post('/api/meal/liked/add', JSON.stringify(searchResult))
      toast.success("Meal is saved successfully.")
      setIsAlreadyLiked(true)
    }
    catch (error) { console.log(error); toast.error("There was a problem liking meal.") }
    finally { setBtnLoading(false) }
  }

  const handleLikeRemove = async () => {
    if (!user_id) { toast.error("Go login"); return }
    
    try {
      setBtnLoading(true)

      await axios.post('/api/meal/liked/remove', JSON.stringify(searchResult))
      toast.success("Meal is removed successfully.")
      setIsAlreadyLiked(false)
    } 
    catch (error) { console.log(error); toast.error("There was a problem unsaving meal.") }
    finally { setBtnLoading(false) }
  }

  return (
    <div className=''>
      {isLoading ? (
        <div className='flex justify-center'>
          <Loader2 className='animate-spin h-8 w-8' />
        </div> 
      ) : (
        !searchResult ? (
          <div className='text-xs sm:text-sm md:text-base'>Nothing to show</div>
        ) : (
          <div className='flex flex-col gap-2 sm:gap-4'>
            <div className='flex gap-2 sm:gap-4 flex-col lg:flex-row'>
              <div className='md:basis-4/5'>
                <MealCard whereRendered={false} key={searchResult.meal_id} mealDetail={searchResult} />
              </div>

              <div className='md:basis-1/5 border-4 border-green-300 rounded-xl p-2 sm:p-4 flex flex-col md:flex-row lg:flex-col gap-4 overflow-auto lg:max-h-[23.9rem]'>
                <p className='w-full font-medium text-xs sm:text-sm md:text-base break-words text-clip'>{searchResult.description}</p>

                {isAlreadyLiked ? 
                  <button onClick={handleLikeRemove} className='outline max-w-[12.5rem] p-1 sm:p-2 w-full mt-auto'>
                    {btnLoading ? (
                      <div className='flex justify-center'>
                        <Loader2 className='animate-spin h-4 w-4' />
                      </div> ) : 
                      (<span className='text-xs sm:text-sm md:text-base'>Remove</span>)
                    }
                  </button>
                  : (
                  <button onClick={handleLikeAdd} className='outline max-w-[12.5rem] p-1 sm:p-2 w-full mt-auto'>
                    {btnLoading ? (
                      <div className='flex justify-center'>
                        <Loader2 className='animate-spin h-4 w-4' />
                      </div> ) : 
                      (<span className='text-xs sm:text-sm md:text-base'>Save</span>)
                    }
                  </button>
                )}

              </div>
            </div>

            <div className='flex gap-4 flex-col md:flex-row'>
              <div className='basis-1/3 border-4 border-green-400 rounded-xl p-2 sm:p-4 font-medium'>
                <p className='text-black text-base sm:text-xl md:text-2xl mb-2 sm:mb-4 underline'>Ingredients</p>

                { searchResult.sections ? (
                  searchResult.sections[0].components.map((ingredient: {raw_text: string}) => {
                    return(
                      <>
                        <p key={ingredient.raw_text} className='my-1 sm:my-2 text-xs sm:text-sm md:text-base'>{ingredient.raw_text}</p>
                      </>
                    )
                  })
                ) : (
                  null
                ) }
              </div>

              <div className='basis-1/3 border-4 border-green-400 rounded-xl p-2 sm:p-4 font-medium text-sm md:text-base'>
                <p className='text-black text-base sm:text-xl md:text-2xl mb-4 underline'>Nutrients</p>

              </div>

              <div className='basis-1/3 border-4 border-green-400 rounded-xl p-2 sm:p-4 font-medium text-sm md:text-base'>
                <p className='text-black text-base sm:text-xl md:text-2xl mb-2 sm:mb-4 underline'>Instructions</p>

                {searchResult.instructions ? (
                  searchResult.instructions.map((instruction) => (
                    <p className='my-1 sm:my-2 text-xs sm:text-sm md:text-base' key={instruction.display_text}>
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
