"use client"

import { getExclusionCount, updateExclusion } from '@/app/helpers/exclusionHelper'
import { FC, useEffect, useState } from 'react'

interface ExclusionClientProps {
  exclusion: Exclusion | null
  user_id: string
  exclusionCount: number
}

const defaultExclusions = [
  {
    name: "Common Exclusions",
    list: [
      'Gluten', 'Peanuts', 'Eggs', 'Fish', 'Milk', 'Soy', 'Shellfish', 'Pork'
    ]
  },
  {
    name: "Dairy",
    list: ['Milk', 'Cream', 'Cheese', 'Yogurt', 'Cottage Cheese']
  },
  {
    name: "Eggs",
    list: ['Eggs']
  },
  {
    name: "Grains",
    list: ['Rice', 'Oats', 'Wheat', 'Barley', 'Couscous', 'Quinoa']
  },
  {
    name: "Soy",
    list: ['Soy', 'Tofu']
  },
  {
    name: "Red Meat",
    list: ['Beef', 'Pork', 'Lamb', 'Veal']
  },
  {
    name: "Poultry",
    list: ['Chicken', 'Turkey']
  },
  {
    name: "Fish",
    list: ['Fish', 'Salmon', 'Tuna', 'Tilapia']
  },
  {
    name: "Shellfish",
    list: ['Shellfish']
  },
  {
    name: "Mayo",
    list: ['Mayo']
  },
  {
    name: "Fats & Nuts",
    list: ['Avocado', 'Peanuts', 'Almonds', 'Walnuts', 'Pecans']
  },
  {
    name: "Legumes",
    list: ['Beans', 'Lentils', 'Peas']
  },
  {
    name: "Fruit",
    list: ['Apple', 'Banana', 'Grapes', 'Orange', 'Strawberries', 'Raspberries', 'Blueberries', 'Fruit juice']
  },
  {
    name: "Vegetables",
    list: ['Artichoke', 'Asparagus', 'Beets', 'Broccoli', 
      'Carrots', 'Sprouts', 'Celery', 'Peppers', 'Tomato', 'Eggplant'
    ] 
  },
  {
    name: "Starchy Vegetables",
    list: ['Potato', 'Yam', 'Corn']
  },
  {
    name: "Honey",
    list: ['Honey']
  },
]

const ExclusionClient: FC<ExclusionClientProps> = ({
  exclusion, user_id, exclusionCount
}) => {
  const [exclusionList, setExclusionList] = useState<string[]>([])
  const [exclusionPercent, setExclusionPercent] = useState<number>(0)

  useEffect(() => {
    if (exclusion?.list) {
      setExclusionList(exclusion.list)
      setExclusionPercent(exclusionCount)
    }

    console.log(exclusion?.list)
  }, [exclusion])

  useEffect( () => {
    const handleUpdateExclusion = async (user_id: string, list: string[]) => {
      await updateExclusion(user_id, list)
    };
  
    const handleUpdateCount = async (list: string[]) => {
      const count = await getExclusionCount(list)
      return count
    };
  
    const updateExclusionAndCount = async () => {
      await handleUpdateExclusion(user_id, exclusionList)
      const count = await handleUpdateCount(exclusionList)
      setExclusionPercent(count)
    };
  
    updateExclusionAndCount()
  }, [exclusionList])

  const handleExclusionClick = async (exclusion: string) => {
    setExclusionList((prevList) => {
      if (prevList.includes(exclusion)) { return prevList.filter((item) => item !== exclusion) } 
      return [...prevList, exclusion] 
    })
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 flex-col'>
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-base sm:text-lg md:text-xl'>Your exclusions</p>

          <div className='flex gap-2 flex-wrap'>
            {exclusionList.length ? (
              exclusionList.map((ex: string, index) => (
                <p key={index} className='border border-gray_border dark:bg-black_hover
                  bg-white_hover rounded w-fit text-xs sm:text-sm p-2 px-4 select-none'>{ex}</p>
              ))
            ) : (
              <p className='text-xs sm:text-sm md:text-base'>empty</p>
            )}
          </div>
        </div>

        <div className='flex gap-2 flex-col'>
          <p className='font-bold text-base sm:text-lg md:text-xl'>Recipes Variety</p>
          <p className='text-xs sm:text-sm md:text-base'>You have excluded 
            <span className='font-bold ml-2'>{exclusionPercent}</span> % of the available recipes.
          </p>
        </div>
      </div><hr className=' border-gray_border' />

      <div className="flex gap-4 flex-col">
        <div className="flex flex-col gap-2">
          {defaultExclusions.map((excluse, index) => (
            <div key={index} className='flex flex-col gap-2'>
              <p className="font-bold text-base sm:text-lg md:text-xl">{excluse.name}</p>
              <div className='flex flex-wrap gap-2'>
                {excluse.list.map((ex, exIndex) => (
                  <p key={exIndex} onClick={() => handleExclusionClick(ex)} 
                    className={`border border-gray_border rounded w-fit text-xs sm:text-sm p-2 px-4 select-none 
                      ${exclusionList.includes(ex) ? 'dark:bg-black_hover bg-white_hover' : 'hover:dark:bg-black_hover '}`}
                  >
                    {ex}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExclusionClient
