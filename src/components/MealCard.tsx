import Image from 'next/image'
import { FC } from 'react'

interface MealCardProps {
  detail: any
}

function trimDecimalPlaces(str: string) {
  const num = parseFloat(str);
  if (isNaN(num)) {
    throw new Error(`Invalid input: ${str}`);
  }
  return num.toFixed(0);
}

const MealCard: FC<MealCardProps> = ({
  detail
}) => {
  return (
    <li className='relative border-4 border-green-300'>
      <Image
        fill
        referrerPolicy='no-referrer'
        className='max-h-[18.5rem] max-w-[18.5rem] aspect-square object-cover relative'
        src={detail.recipe.image || ''}
        alt='food'
        style={{
        }}
      />

      <div className='pt-[20rem] flex flex-col bg-yellow-400 h-full'>
        <p>name: {detail.recipe.label}</p>
        <p className='bg-red-400 mt-auto'>calories: {trimDecimalPlaces(detail.recipe.calories)}</p>
      </div>
    </li>
  )
}

export default MealCard
