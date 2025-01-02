"use client"

import { submitExclusionAction } from '@/app/actions/actions'
import { FC } from 'react'
import ExclusionButton from './ExclusionButton'

interface ExclusionFormProps {
  exclusion: string
  exclusionList: string[] | null
  key: string
  user_id: string
}

const ExclusionForm: FC<ExclusionFormProps> = ({
  exclusion, exclusionList, key, user_id
}) => {
  return (
    <form key={key} action={submitExclusionAction}
      className={`${exclusionList?.includes(exclusion) ? 'border-text_link' : 
        'hover:dark:bg-black_hover hover:bg-white_hover border-black_border'} border-2  
        rounded w-fit text-sm sm:text-base select-none
      `}>

      <input type="hidden" name="exclusionUserId" className="hidden" defaultValue={user_id} />
      <input type="hidden" name="exclusionName" className="hidden" defaultValue={exclusion} />

      <ExclusionButton exclusion={exclusion} />
    </form>
  )
}

export default ExclusionForm
