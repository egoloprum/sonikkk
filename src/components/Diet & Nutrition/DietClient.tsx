"use client"

import { updatePrimaryDiet } from '@/app/helpers/dietHelper'
import { updateExclusion } from '@/app/helpers/exclusionHelper'
import { Sandwich, Wheat, Cherry, Drumstick, Vegan, LeafyGreen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface DietClientProps {
  primaryDiet: PrimaryDiet | null
  user_id: string
}

const defaultDiets = [
  {
    name: "Anything",
    exclusion: "Nothing",
    icon: Sandwich,
    excludeList: []
  },
  {
    name: "Keto",
    exclusion: "Legumes, Starchy Vegetables, Grains",
    icon: Wheat,
    excludeList: ['Beans', 'Lentils', 'Peas', 'Potato', 'Yam', 'Corn', 'Rice', 'Oats', 'Wheat', 'Barley', 'Couscous', 'Quinoa']
  },
  {
    name: "Mediterranean",
    exclusion: "Red Meat, Starchy Vegetables, Fruit juice",
    icon: Cherry,
    excludeList: ['Beef', 'Pork', 'Lamb', 'Veal', 'Potato', 'Yam', 'Corn', 'Fruit juice']
  },
  {
    name: "Paleo",
    exclusion: "Dairy, Grains, Legumes, Soy, Starchy Vegetables",
    icon: Drumstick,
    excludeList: ['Milk', 'Cream', 'Cheese', 'Yogurt', 'Cottage Cheese', 'Rice', 'Oats', 'Wheat', 'Barley', 'Couscous', 'Quinoa',
      'Beans', 'Lentils', 'Peas', 'Soy', 'Tofu', 'Potato', 'Yam'
    ]
  },
  {
    name: "Vegan",
    exclusion: "Red Meat, Poultry, Shellfish, Fish, Dairy, Eggs, Mayo, Honey",
    icon: Vegan,
    excludeList: ['Beef', 'Pork', 'Lamb', 'Veal', 'Chicken', 'Turkey', 'Shellfish', 'Fish', 'Salmon', 'Tuna', 'Tilapia',
      'Milk', 'Cream', 'Cheese', 'Yogurt', 'Cottage Cheese', 'Eggs', 'Mayo', 'Honey'
    ]
  },
  {
    name: "Vegetarian",
    exclusion: "Red Meat, Poultry, Shellfish",
    icon: LeafyGreen,
    excludeList: ['Beef', 'Pork', 'Lamb', 'Veal', 'Chicken', 'Turkey', 'Shellfish']
  },
] 

const DietClient: FC<DietClientProps> = ({
  primaryDiet, user_id
}) => {
  const [selectedDiet, setSelectedDiet] = useState<string>("Anything")
  const router = useRouter()

  useEffect(() => {
    if (primaryDiet) {
      setSelectedDiet(primaryDiet.diet_type)
    }
  }, [])

  const selectDietHandle = async (name: string, excludeList: string[]) => {
    setSelectedDiet(name)
    console.log(name)

    await updatePrimaryDiet(user_id, name)
    await updateExclusion(user_id, excludeList)

    router.refresh()
  }

  return (
    <div>

      <div className='flex flex-col gap-4'>
        {defaultDiets.map((diet) => {
          const IconComp = diet.icon

          return (
            <label 
              onClick={() => selectDietHandle(diet.name, diet.excludeList)} key={diet.name} 
              className={`border-2 dark:border-black_border border-white_border rounded p-4 flex gap-4 items-center 
              select-none cursor-pointer hover:dark:bg-black_hover hover:bg-white_hover
              ${selectedDiet === diet.name ? 'dark:bg-black_hover bg-white_hover' : '' }`}
            >
              <span className={`min-w-4 min-h-4 rounded-full border-2 border-gray_border flex items-center justify-center 
                ${selectedDiet === diet.name ? 'bg-gray_border' : ''}`}>
                {selectedDiet === diet.name && <span className="min-w-2 min-h-2 rounded-full dark:bg-white_extra bg-black_extra"></span>}
              </span>
              <IconComp className='sm:min-w-10 sm:min-h-10 min-w-8 min-h-8' />
              <p className='flex flex-col gap-1'>
                <span className='font-bold text-sm sm:text-base'>{diet.name}</span>
                <span className='text-xs sm:text-sm md:text-base'>Excludes: {diet.exclusion}</span>
              </p>
          </label>
          )

        })}
      </div>

    </div>
  )
}

export default DietClient
