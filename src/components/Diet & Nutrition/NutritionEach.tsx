"use client"

import { deleteNutritionTarget, saveNutritionTarget } from '@/app/helpers/nutritionHelper'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface NutritionEachProps {
  nutritionTarget: NutritionTarget
}

const NutritionEach: FC<NutritionEachProps> = ({nutritionTarget}) => {
  const router = useRouter()

  const [title, setTitle] = useState<string>()
  const [calories, setCalories] = useState<number>()
  const [carbs, setCarbs] = useState<number>()
  const [fats, setFats] = useState<number>()
  const [protein, setProtein] = useState<number>()
  const [fiber, setFiber] = useState<number>()

  useEffect(() => {
    setTitle(nutritionTarget.title)
    setCalories(nutritionTarget.calories)
    setCarbs(nutritionTarget.carbs)
    setFats(nutritionTarget.fats)
    setProtein(nutritionTarget.protein)
    setFiber(nutritionTarget.fiber)
  }, [])

  const handleNutritionDelete = async (nutrition_id: string) => {
    try {
      const deleteNutr = await deleteNutritionTarget(nutrition_id)
      if (deleteNutr) { router.push('/nutrition'); router.refresh() }
    } catch (error) { console.log(error); toast.error("please refresh") }
  }

  const handleNutritionSave = async (event: React.FormEvent) => {
    event.preventDefault();

    const nutrition = {
      id: nutritionTarget.id,
      title: title,
      calories: calories,
      carbs: carbs,
      fats: fats,
      protein: protein,
      fiber: fiber
    } as NutritionTarget
    
    try {
      const updateNutr = await saveNutritionTarget(nutrition)
      if (updateNutr) { router.push('/nutrition'); router.refresh() }
    } catch (error) { console.log(error); toast.error("please refresh") }
  }

  return (
    <form onSubmit={(e) => {handleNutritionSave(e)}}>
      <div>
        <p className='flex justify-between items-center gap-2 py-4'>
          <span className='text-xs sm:text-sm md:text-base font-bold'>Title</span>
          <input type="text" className='p-2 outline-none rounded border dark:bg-black_mid bg-white_mid px-2 sm:px-4
            dark:border-black_border border-white_hover focus:dark:border-white_mid focus:border-black_mid
            text-xs sm:text-sm md:text-base' required defaultValue={title} onChange={(e) => {setTitle(e.target.value)}} />
        </p><hr className='dark:border-black_border border-white_border' />

        <p className='flex justify-between gap-2 py-4'>
          <span className='text-xs sm:text-sm md:text-base font-bold'>Calories</span>
          <input type="number" className='p-2 outline-none rounded border dark:bg-black_mid bg-white_mid px-2 sm:px-4
            dark:border-black_border border-white_hover focus:dark:border-white_mid focus:border-black_mid
            text-xs sm:text-sm md:text-base max-w-[3.5rem] sm:max-w-[5rem] md:max-w-[5.5rem] w-full text-right' 
            defaultValue={calories} max={10000} min={1000} 
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1000 && value <= 10000) {
                setCalories(value);
              }
            }}
          />
        </p>

        <p className='py-4 flex gap-2'>
          <span className='text-xs sm:text-sm md:text-base'>Not sure ?</span>
          <span className='text-xs sm:text-sm md:text-base'>View Our Suggestions</span>
        </p>
      </div>

      <div>
        <p className='py-4 flex flex-col gap-2'>
          <span className='text-lg font-bold'>Target Macros</span>
          <span className='text-xs sm:text-sm'>
            Select the range of each macronutrient you want in your diet. A more 
            flexible range will give you much more variety in your meals.</span>
        </p>

        <p className='py-4 flex justify-between gap-2'>
          <span className='text-xs sm:text-sm md:text-base font-bold'>Calculate Macros</span>
          <span className='text-xs sm:text-sm md:text-base'>Within a range</span>
        </p><hr className='dark:border-black_border border-white_border' />

        <div className='py-3 sm:py-4 flex justify-between gap-2 items-center'>
          <span className='text-xs sm:text-sm md:text-base font-bold'>Carbs</span>
          <div className='flex gap-2 items-center'>
            <input type="number" className='p-2 outline-none rounded border dark:bg-black_mid bg-white_mid px-2 sm:px-4
              dark:border-black_border border-white_hover focus:dark:border-white_mid focus:border-black_mid
              text-xs sm:text-sm md:text-base max-w-[2.5rem] sm:max-w-[3.75rem] md:max-w-[4rem] w-full text-right'
              defaultValue={carbs} max={1000} min={0} 
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= 1000) {
                  setCarbs(value);
                }
              }}
              />
            <span className='text-xs sm:text-sm md:text-base'>g</span>
          </div>
        </div><hr className='dark:border-black_border border-white_border' />

        <div className='py-3 sm:py-4 flex justify-between gap-2 items-center'>
          <span className='text-xs sm:text-sm md:text-base font-bold'>Fats</span>
          <div className='flex gap-2 items-center'>
            <input type="number" className='p-2 outline-none rounded border dark:bg-black_mid bg-white_mid px-2 sm:px-4
              dark:border-black_border border-white_hover focus:dark:border-white_mid focus:border-black_mid
              text-xs sm:text-sm md:text-base max-w-[2.5rem] sm:max-w-[3.75rem] md:max-w-[4rem] w-full text-right'
              defaultValue={fats} max={1000} min={0} 
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= 1000) {
                  setFats(value);
                }
              }} 
            />
            <span className='text-xs sm:text-sm md:text-base'>g</span>
          </div>
        </div><hr className='dark:border-black_border border-white_border' />

        <div className='py-3 sm:py-4 flex justify-between gap-2 items-center'>
          <span className='text-xs sm:text-sm md:text-base font-bold'>Protein</span>
          <div className='flex gap-2 items-center'>
            <input type="number"  className='p-2 outline-none rounded border dark:bg-black_mid bg-white_mid px-2 sm:px-4
              dark:border-black_border border-white_hover focus:dark:border-white_mid focus:border-black_mid
              text-xs sm:text-sm md:text-base max-w-[2.5rem] sm:max-w-[3.75rem] md:max-w-[4rem] w-full text-right'
              defaultValue={protein} max={1000} min={0} 
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= 1000) {
                  setProtein(value);
                }
              }} 
            />
            <span className='text-xs sm:text-sm md:text-base'>g</span>
          </div>
        </div>
      </div>

      <div>
        <p className='py-4 flex justify-between gap-2'>
          <span className='text-base sm:text-lg font-bold'>Micronutrients</span>
        </p><hr className='dark:border-black_border border-white_border' />

        <div className='py-4 flex justify-between gap-2 items-center'>
          <span className='text-xs sm:text-sm md:text-base font-bold'>Minimum Fiber</span>
          <div className='flex gap-2 items-center'>
            <input type="number" className='p-2 outline-none rounded border dark:bg-black_mid bg-white_mid px-2 sm:px-4
              dark:border-black_border border-white_hover focus:dark:border-white_mid focus:border-black_mid
              text-xs sm:text-sm md:text-base max-w-[2.5rem] sm:max-w-[3.75rem] md:max-w-[4rem] w-full text-right'
              defaultValue={fiber} max={1000} min={0} 
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= 1000) {
                  setFiber(value);
                }
              }} 
            />
            <span className='text-xs sm:text-sm md:text-base'>g</span>
          </div>
        </div>
      </div>

      <div className='py-4 flex gap-4 justify-end'>
        <button type='button' className='border-2 dark:border-black_border text-xs sm:text-sm md:text-base hover:dark:bg-black_hover 
          px-2 py-1 max-w-28 w-full rounded mr-auto' onClick={() => {handleNutritionDelete(nutritionTarget.id)}}>Delete</button>
        <button type='button' className='border-2 dark:border-black_border text-xs sm:text-sm md:text-base hover:dark:bg-black_hover 
          px-2 py-1 max-w-28 w-full rounded' onClick={() => {router.push('/nutrition'); router.refresh()}}>Cancel</button>
        <button type='submit' className='border-2 dark:border-black_border text-xs sm:text-sm md:text-base hover:dark:bg-black_hover 
          px-2 py-1 max-w-28 w-full rounded'>Save</button>
      </div>
    </form>
  )
}

export default NutritionEach
