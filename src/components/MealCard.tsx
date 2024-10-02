"use client"

import { extractIdFromUrl, trimDecimalPlaces } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link';
import { FC } from 'react'

interface MealCardProps {
  mealDetail: Meal
}

const MealCard: FC<MealCardProps> = ({
  mealDetail
}) => {

  const mealId = mealDetail.id

  const handleSubmit = (index: string) => {
    console.log(`clicked on ${index} ${mealId}`)
  }


  return (
    <div onClick={() => handleSubmit(mealId)} key={mealId} className='relative border-4 border-green-300 hover:scale-105 transition'>
      <Image
        fill
        referrerPolicy='no-referrer'
        className='max-h-[18.5rem] max-w-[18.5rem] aspect-square object-cover relative'
        src={mealDetail.thumbnail_url || ''}
        alt='food'
        style={{
        }}
      />

      <div  className='pt-[20rem] flex flex-col bg-yellow-400 h-full'>
        <Link
          href={`/generate-meal/${mealId}`}
        >
          {mealDetail.name}
        </Link>

        <p className='bg-red-400 mt-auto'>calories: {mealDetail.nutrition.calories}</p>
      </div>
    </div>
  )
}

export default MealCard
