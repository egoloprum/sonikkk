"use client"

import axios from 'axios'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

interface MealDetailProps {
  mealId: string
}

const MealDetail: FC<MealDetailProps> = ({
  mealId
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<Meal>()

  const fetchData = async () => {
    try {
      setIsLoading(true)

      const response = await axios.post('/api/v2/meal/each', JSON.stringify({ "id": mealId }))
      const responseData = response.data

      setSearchResult(responseData)
      
      if (responseData) {
        setIsLoading(false)
      }

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
  }, [])
  

  return (
    <div className='border-4 border-green-400 flex justify-center p-4'>
        {isLoading ? (
          <Loader2 className='animate-spin h-4 w-4' />
        ) : (
          !searchResult ? (
            <div>Nothing to show</div>
          ) : (
            <div className='relative max-w-[1300px] w-full h-full border-4 border-red-400 flex gap-4'>
              <div className='basis-1/4 flex flex-col gap-4 aspect-square border-4 border-blue-400'>
                <div className='relative max-w-72 w-full aspect-square'>
                  <Image
                    fill
                    referrerPolicy='no-referrer'
                    className='max-w-72 max-h-72'
                    src={searchResult.thumbnail_url || ''}
                    alt='food'
                    style={{
                    }}
                  />
                </div>

                <div className='border-4 border-green-400'>
                  <p className=''>{searchResult.name}</p>
                  <p className='my-5'>{searchResult.description}</p>
                </div>

                <div className='border-4 border-green-400 mt-auto'>
                  <button>Save</button>
                </div>
              </div>

              <div className='basis-1/4 border-4 border-green-400'>
                <p>Ingredients</p>

                {searchResult.sections[0].components.map((ingredient: {raw_text: string}) => {
                  return(
                    <>
                      <p className='my-5'>{ingredient.raw_text}</p>
                    </>
                  )
                })}

              </div>

              <div className='basis-1/4 border-4 border-green-400'>
                <p>Nutrients</p>

                {Object.keys(searchResult.nutrition).filter((key) => key !== 'updated_at' && key in searchResult.nutrition).map((key) => (
                  <p className='my-5'>{key}: {searchResult.nutrition[key as keyof Nutrition]}</p>
                ))}

              </div>

              <div className='basis-1/4 border-4 border-green-400'>
                <p>Instructions</p>

                {searchResult.instructions.map((instruction: {display_text: string}) => {
                  return(
                    <>
                      <p className='my-5'>{instruction.display_text}</p>
                    </>
                  )
                })}

              </div>
            </div>
          )
        )}



    </div>
  )
}

export default MealDetail
