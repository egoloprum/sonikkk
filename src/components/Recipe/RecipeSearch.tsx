"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import SearchComp from '../UI/SearchComp'
import LayoutComp from '../UI/LayoutComp'
import FilterComp from '../UI/FilterComp'

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
      <FilterComp className={`order-1`} />
      <SearchComp className={`sm:order-2 order-3`} handleSubmit={handleSubmit} setSearchParam={setSearchParam} />
      <LayoutComp className={`sm:order-3 order-2 `} />

    </div>
  )
}

export default RecipeSearch
