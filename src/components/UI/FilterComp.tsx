import { Filter } from 'lucide-react'
import { FC } from 'react'

interface FilterCompProps {
  className?: string
}

const FilterComp: FC<FilterCompProps> = ({className}) => {
  return (
    <div className={`${className} border-2 rounded max-w-60 py-2 px-4 dark:border-black_border border-white_border
    hover:dark:bg-black_hover hover:bg-white_hover cursor-pointer flex items-center`}>
      <p className='flex gap-2 items-center'>
        <Filter />
        <span className='text-xs sm:text-sm md:text-base'>Filters</span>
      </p>
    </div>
  )
}

export default FilterComp
