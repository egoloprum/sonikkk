"use client"

import Link from 'next/link';
import { FC } from 'react'

interface MealCardProps {
  mealDetail: Meal
  key: string
  whereRendered: boolean
}

const MealCard: FC<MealCardProps> = ({
  mealDetail, key, whereRendered
}) => {

  const meal_id = mealDetail.meal_id
  const keywords = mealDetail.keywords?.split(', ').slice(0, 5) as string[]


  const handleSubmit = (index: string) => {
    console.log(`clicked on ${index} ${meal_id}`)
  }

  return (
    <div onClick={() => handleSubmit(meal_id)} key={key} 
      className='border-4 rounded-xl border-green-300 w-full flex flex-wrap lg:flex-nowrap md:flex-nowrap sm:flex-nowrap'
    >
      <div className='lg:basis-1/3 sm:basis-1/2 overflow-hidden rounded-t-lg sm:rounded-s-lg sm:rounded-t-none lg:max-w-[20rem] lg:max-h-[20rem] aspect-square'>
        <img src={mealDetail.thumbnail_url || ''} alt="food" 
          className='min-h-[15rem] min-w-[15rem] object-contain w-full h-full rounded-t-lg sm:rounded-s-lg sm:rounded-t-none aspect-square hover:scale-110 transition duration-300' 
        />
      </div>

      <div className='lg:basis-2/3 sm:basis-1/2 flex flex-col justify-center mx-auto w-full md:p-6 sm:p-4 p-2 md:gap-6 gap-4'>
        <div className='flex lg:flex-nowrap flex-wrap md:gap-6 gap-4'>
          <div className='grow w-full flex flex-col gap-1'>
            {whereRendered ? (
              <Link href={`/generate-meal/${meal_id}`} 
              className='hover:scale-105 hover:outline-dashed outline-2 outline-offset-4 
              rounded transition text-black text-xl sm:text-2xl md:text-3xl my-2'
              >
                {mealDetail.name}
              </Link>
            ) : (
              <p className='hover:scale-105 hover:outline-dashed outline-2 outline-offset-4 
              rounded transition text-black text-xl sm:text-2xl md:text-3xl my-2'>{mealDetail.name}</p>
            )}

            <div className='mt-auto'>
              <p className='flex justify-between gap-2 text-sm md:text-base'>
                <span>Prepartion time in minutes</span>
                <span className='font-bold'>{mealDetail.prep_time_minutes}</span>
              </p>
              <p className='flex justify-between gap-2 text-sm md:text-base'>
                <span>Cook time in minutes</span>
                <span className='font-bold'>{mealDetail.cook_time_minutes}</span>
              </p>
            </div>
          </div>

          <div className='grow w-full flex flex-col gap-1 justify-between'>
            {Object.keys(mealDetail.nutrition).filter((key) => key !== 'updated_at').map((key) => (
              <p key={key} className='flex justify-between gap-2 text-sm md:text-base'>
                <span>{key}</span>
                <span className='font-bold'>{mealDetail?.nutrition[key]}</span>
              </p>
            ))}
          </div>
        </div>

        <div className='flex flex-wrap md:gap-4 md:gap-2 gap-1 mt-auto lg:mt-0'>
          {keywords?.filter((keyword) => keyword !== "").map((keyword: string) => (
            <p key={keyword} className='border-2 rounded px-2 py-1 font-medium text-xs sm:text-sm md:text-base'>{keyword}</p>
          ))}
        </div>

      </div>
    </div>
  )
}

export default MealCard
