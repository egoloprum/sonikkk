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
      className={`${exclusionList?.includes(exclusion) ? 'dark:bg-black_hover bg-white_hover' : 
        'hover:dark:bg-black_hover hover:bg-white_hover'} border border-gray_border 
        rounded w-fit text-xs sm:text-sm select-none
      `}>

      <input type="hidden" name="exclusionUserId" className="hidden" defaultValue={user_id} />
      <input type="hidden" name="exclusionName" className="hidden" defaultValue={exclusion} />
      <input type="hidden" name="exclusionList" className="hidden" defaultValue={exclusionList ?? ""} />

      <ExclusionButton exclusion={exclusion} />
    </form>
  )
}

export default ExclusionForm
