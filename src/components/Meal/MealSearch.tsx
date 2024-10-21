'use client'

import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import MealCard from './MealCard'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface MealSearchProps {
  sessionId?: string
  serverSearch?: string
  serverResults: Meal[]
  isProduction: boolean
}

const MealSearch: FC<MealSearchProps> = ({
  serverSearch, serverResults, isProduction
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Meal[]>()
  // const [searchPagination, setSearchPagination] = useState()

  const router = useRouter()

  useEffect(() => {
    if (serverResults && serverResults.length) {
      setSearchResults(serverResults)
    } else { setSearchResults([]) }
    if (serverSearch?.length) {
      setSearchInput(serverSearch)
    }
  }, [])

  const fetchSearchResults = async (searchData: object) => {
    try {
      setIsLoading(true)

      let endpoint = '';
    
      if (isProduction) {
        endpoint = 'http://localhost:3000/api/meal/all'
      }
      else {
        endpoint = 'https://sonikkk.vercel.app/api/meal/all'
      }

      const response = await axios.post(endpoint, searchData);
      const results = response.data

      if (!results.length) {
        toast.error("Nothing is found.")
      }
      setSearchResults(results)

    } 
    catch (error) {
      console.error(error)
      setSearchResults([])
    } 
    finally { setIsLoading(false) }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const sanitizedValue = searchInput.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ').trim();
    setSearchInput(sanitizedValue)

    if (sanitizedValue && sanitizedValue.length) {
      router.push(`?search=${sanitizedValue}`)
      fetchSearchResults({ "name": sanitizedValue })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='py-2 flex flex-col gap-4 mb-4'>
        <div className='flex flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap justify-center align-center gap-4'>

          <label className="input input-bordered flex items-center gap-2 w-full max-w-[20rem]">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text" className="grow" placeholder="Enter your meal..." 
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>

          <button className="btn" type='submit'>Search</button>
        </div>
      </form>

      <div className='flex flex-col gap-8'>
        {isLoading ? (
          <Loader2 className='animate-spin h-4 w-4' />
        ) : (
          !searchResults ? (
            <p>Nothing to show</p>
          ) : (
            <>
              <div className='flex flex-col gap-6'>
                {searchResults.map((mealDetail: Meal) => (
                  <MealCard whereRendered={true} key={mealDetail.meal_id} mealDetail={mealDetail} />
                ))}
              </div>

              {/* <div className='border-4 border-red-400 w-full flex justify-center'>
                <div className="join bg-red-500 flex w-full max-w-[40rem]">
                  <button className="flex-1 join-item btn">1</button>
                  <button className="flex-1 join-item btn">2</button>
                  <button className="flex-1 join-item btn btn-disabled">...</button>
                  <button className="flex-1 join-item btn">99</button>
                  <button className="flex-1 join-item btn">100</button>
                </div>
              </div> */}

            </>
          )
        )}

      </div>
    </>

  )
}

export default MealSearch
