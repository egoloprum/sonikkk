"use client"

import Link from 'next/link';
import { FC } from 'react'

interface MealCardProps {
  mealDetail: Meal
}

const MealCard: FC<MealCardProps> = ({
  mealDetail
}) => {

  const meal_id = mealDetail.meal_id
  const keywords = mealDetail.keywords?.split(', ') as string[]


  const handleSubmit = (index: string) => {
    console.log(`clicked on ${index} ${meal_id}`)
  }

  return (
    <div onClick={() => handleSubmit(meal_id)} key={meal_id} 
      className='border-4 rounded-xl border-green-300 w-full flex flex-wrap lg:flex-nowrap md:flex-nowrap sm:flex-nowrap md:gap-4 gap-2 my-4'
    >
      <div className='md:basis-1/3 overflow-hidden rounded-s-lg md:max-w-[18rem] md:max-h-[18rem] aspect-square'>
        <img src={mealDetail.thumbnail_url || ''} alt="food" 
          className='min-h-[15rem] min-w-[15rem] w-full h-full rounded-s-lg aspect-square hover:scale-110 transition duration-300' 
        />
      </div>

      <div className='md:basis-2/3 flex flex-col w-full md:p-6 p-4 md:gap-6 gap-4'>
        <div className='flex lg:flex-nowrap flex-wrap md:gap-6 gap-4'>
          <div className='grow w-full flex flex-col justify-center gap-1'>
            <Link href={`/generate-meal/${meal_id}`} 
              className='hover:scale-105 hover:outline-dashed outline-2 outline-offset-4 
              rounded transition text-black text-xl sm:text-2xl md:text-3xl my-2'
            >
              {mealDetail.name}
            </Link>

            <p className='flex justify-between gap-2 text-sm md:text-base'>
              <span>Prepartion time in minutes</span>
              <span className='font-bold'>{mealDetail.prep_time_minutes}</span>
            </p>
            <p className='flex justify-between gap-2 text-sm md:text-base'>
              <span>Cook time in minutes</span>
              <span className='font-bold'>{mealDetail.cook_time_minutes}</span>
            </p>
          </div>

          <div className='grow  w-full flex flex-col gap-1'>
            {Object.keys(mealDetail.nutrition).filter((key) => key !== 'updated_at').map((key) => (
              <p className='flex justify-between gap-2 text-sm md:text-base'>
                <span>{key}</span>
                <span className='font-bold'>{mealDetail?.nutrition[key]}</span>
              </p>
            ))}
          </div>
        </div>

        <div className='flex flex-wrap md:gap-4 gap-2'>
          {keywords?.filter((keyword) => keyword !== "").map((keyword: string) => (
            <p key={keyword} className='border-2 rounded px-2 py-1 font-medium text-sm md:text-base'>{keyword}</p>
          ))}
        </div>

      </div>
    </div>
  )
}

export default MealCard
