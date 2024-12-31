"use client"

import { Search } from 'lucide-react'
import { FC, SetStateAction } from 'react'

interface SearchCompProps {
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  setSearchParam?: (value: SetStateAction<string>) => void
  className?: string
}

const SearchComp: FC<SearchCompProps> = ({
  handleSubmit, setSearchParam, className
}) => {
  return (
    <form className={`${className} border-2 rounded dark:border-black_border border-white_border 
    focus-within:border-white_hover relative max-w-60 flex items-center`}
      onSubmit={(e) => handleSubmit && handleSubmit(e)}>
      <input type="text" placeholder="Search..." 
        className="px-4 py-2 mr-6 outline-none text-sm sm:text-base dark:bg-black_mid bg-white_extra" 
        onChange={(e) => setSearchParam && setSearchParam(e.target.value)}
      />
      <Search className='absolute top-2 right-2' />
    </form>
  )
}

export default SearchComp
