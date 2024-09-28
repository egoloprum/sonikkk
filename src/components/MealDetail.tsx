"use client"

import { trimDecimalPlaces } from '@/lib/utils'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface MealDetailProps {
  mealId: string
}

const MealDetail: FC<MealDetailProps> = ({
  mealId
}) => {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fetchedResponseData, setFetchedResponseData] = useState<any>({})

  const fetchData = async () => {
    try {
      setIsLoading(true)

      const response = await axios.post('/api/meal/get', JSON.stringify({ mealId }))
      const responseData = response.data

      setFetchedResponseData(responseData)
      
      if (responseData) {
        setIsLoading(false)
      }

    } catch (error) {
      console.error(error)
      setFetchedResponseData({})
    }
    finally {
      
    }

    router.refresh()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='border-4 border-green-400 flex justify-center p-4'>
        {isLoading ? (
          <Loader2 className='animate-spin h-4 w-4' />
        ) : (
          !fetchedResponseData.recipe ? (
            <div>Nothing to show</div>
          ) : (
            <div className='relative max-w-[1300px] h-full border-4 border-red-400 flex gap-4'>
              <div className='basis-1/3 flex flex-col gap-4 aspect-square border-4 border-blue-400'>
                <div className='relative max-w-72 w-full aspect-square'>
                  <Image
                    fill
                    referrerPolicy='no-referrer'
                    className='max-w-72 max-h-72'
                    src={fetchedResponseData.recipe.image || ''}
                    alt='food'
                    style={{
                    }}
                  />
                </div>

                <div className='border-4 border-green-400'>
                  <p className=''>{fetchedResponseData.recipe.label}</p>
                  <p className=''>{trimDecimalPlaces(fetchedResponseData.recipe.calories)} calories</p>
                </div>
              </div>

              <div className='basis-1/3 border-4 border-green-400'>
                  <p>Ingredients</p>

                  {fetchedResponseData.recipe.ingredientLines.map((ingedient: string) => (
                    <p>{ingedient}</p>
                  ))}

              </div>

              <div className='basis-1/3 border-4 border-green-400'>
                <p>Nutrients</p>
                
                {fetchedResponseData.recipe.digest.map((nutrient: any) => (
                  <div className='flex'>
                    <p>{nutrient.label}</p>
                    <p className='ml-auto'>{trimDecimalPlaces(nutrient.total)}</p>
                    <p>{nutrient.unit}</p>
                  </div>
                ))}

              </div>
            </div>
          )
        )}



    </div>
  )
}

export default MealDetail
