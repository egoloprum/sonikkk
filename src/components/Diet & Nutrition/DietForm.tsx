"use client"

import { submitDietAction } from '@/app/actions/actions'
import { FC } from 'react'
import DietButton from './DietButton'

interface DietFormProps {
  diet: Diet
  key: number
  primaryDiet: PrimaryDiet
  user_id: string
}

type Diet = {
  name: string
  exclusion: string
  icon: string
  excludeList: string[]
}

const DietForm: FC<DietFormProps> = ({
  diet, key, primaryDiet, user_id
}) => {


  return (
    <form action={submitDietAction} key={key} 
      className={`border-2 dark:border-black_border border-white_border rounded select-none
      hover:dark:bg-black_hover hover:bg-white_hover cursor-pointer 
      ${primaryDiet.diet_type === diet.name ? 'dark:bg-black_hover bg-white_hover' : '' }`}
    >
      <input type="hidden" name="dietUserId" className="hidden" defaultValue={user_id} />
      <input type="hidden" name="dietName" className="hidden" defaultValue={diet.name} />
      <input type="hidden" name="dietList" className="hidden" defaultValue={diet.excludeList} />

      <DietButton diet={diet} />

    </form>
  )
}

export default DietForm
