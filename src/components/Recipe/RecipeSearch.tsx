"use client"

import { Filter, LayoutGrid, List, Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const RecipeSearch = ({}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [searchParam, setSearchParam] = useState<string>("")


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const sanitizedValue = searchParam.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ').trim()
    setSearchParam(sanitizedValue)

    const params = new URLSearchParams(searchParams || '');
    if (sanitizedValue.length) { params.set('query', sanitizedValue) }
    else { params.delete('query') }
    
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='py-4 flex flex-wrap gap-4'>
      <div className='order-1 border-2 rounded max-w-60 py-2 px-4 dark:border-black_border border-white_border
        hover:dark:bg-black_hover hover:bg-white_hover cursor-pointer flex items-center'>
        <p className='flex gap-2 items-center'>
          <Filter />
          <span className='text-xs sm:text-sm md:text-base'>Filters</span>
        </p>
      </div>

      <form className="sm:order-2 order-3 border-2 rounded dark:border-black_border border-white_border 
        focus-within:border-white_hover relative max-w-60 flex items-center"
          onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Search..." 
          className="px-4 py-2 mr-6 outline-none text-sm sm:text-base dark:bg-black_mid bg-white_extra" 
          onChange={(e) => {setSearchParam(e.target.value)}}
        />
        <Search className='absolute top-2 right-2' />
      </form>

      <div className='sm:order-3 order-2 md:ml-auto border rounded dark:border-black_border border-white_border flex gap-2 w-fit'>
        <div className='hover:bg-black_hover rounded py-1 px-3 m-1 flex justify-center items-center'>
          <LayoutGrid className='' />
        </div>
        
        <div className='hover:bg-black_hover rounded px-3 m-1 flex justify-center items-center'>
          <List className=''/>
        </div>
      </div>
    </div>
  )
}

export default RecipeSearch
