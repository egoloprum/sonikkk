'use client'

import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useState, useTransition } from 'react'
import MealCard from './MealCard'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

interface MealSearchProps {
  sessionId?:     string
  serverSearch?:  string
  serverResults:  Meal[]
  isProduction:   boolean
}

const MealSearch: FC<MealSearchProps> = ({
  serverSearch, serverResults, isProduction,
}) => {
  const [isLoading, setIsLoading] = useTransition()
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Meal[]>()

  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage: number = 10;

  const router = useRouter()

  useEffect(() => {
    if (serverSearch?.length) {
      setSearchInput(serverSearch)
    }

    if (serverResults && serverResults.length) {
      setSearchResults(serverResults)
      const newPage = parseInt(searchParams?.get('page') ?? '1', 10)
      const totalPage = Math.ceil(serverResults.length / itemsPerPage)
      setCurrentPage(newPage)
      setTotalPages(totalPage)
      router.push(`/generate-meal?search=${serverSearch}&page=${newPage}&totalPages=${totalPage}`)
    } else { setSearchResults([]) }
  }, [])

  useEffect(() => {
    if (searchParams) {
      const page = parseInt(searchParams.get('page') ?? '1', 10);
      const total = parseInt(searchParams.get('totalPages') ?? '1', 10);
      setCurrentPage(page);
      setTotalPages(total);
    }
  }, [searchParams])

  const updatePaginationURL = (newPage: number, newTotalPages: number) => {
    // setIsLoading(true);
    setIsLoading(() => {
      router.push(`/generate-meal?search=${searchInput}&page=${newPage}&totalPages=${newTotalPages}`);
    })
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(newPage);
    updatePaginationURL(newPage, totalPages);
  }

  const handlePreviousPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
    updatePaginationURL(newPage, totalPages);
  }

  const paginatedResults = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return searchResults ? searchResults.slice(start, end) : [];
  }

  const fetchSearchResults = (searchData: object) => {
    setIsLoading(async() => {
      
      try {
        const endpoint = isProduction 
          ? 'http://localhost:3000/api/meal/all' 
          : 'https://sonikkk.vercel.app/api/meal/all';
  
        const response = await axios.post(endpoint, searchData);
        const results: Meal[] = response.data
  
        if (!results.length) { toast.error("Nothing is found.") }
        setSearchResults(results)
        const newPage = 1
        const totalPage = Math.ceil(results.length / itemsPerPage)
        setCurrentPage(newPage)
        setTotalPages(totalPage)
        router.push(`/generate-meal?search=${searchInput}&page=${newPage}&totalPages=${totalPage}`)
      } 
      catch (error) {
        console.error(error)
        setSearchResults([])
      } 

    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const sanitizedValue = searchInput.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ').trim();
    setSearchInput(sanitizedValue)

    if (sanitizedValue && sanitizedValue.length) {
      router.push(`?search=${sanitizedValue}&page=${currentPage}&totalPages=${totalPages}`)
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
          !paginatedResults() || !paginatedResults().length ? (
            <p>Nothing to show</p>
          ) : (
            <>
              <div className='flex flex-col gap-6'>
                {paginatedResults().map((mealDetail: Meal) => (
                  <MealCard whereRendered={true} key={mealDetail.meal_id} mealDetail={mealDetail} />
                ))}
              </div>

              <div className='flex justify-center gap-4 max-w-[25rem] w-full place-self-center'>
                <button className='border-2 border-black py-2 px-1 hover:bg-gray-200 focus:bg-gray-200 basis-2/5' 
                  onClick={handlePreviousPage} disabled={currentPage === 1}
                >
                  Previous
                </button>
                <div className='border-2 border-black p-2 basis-1/5 flex justify-center gap-4'>
                  <span>{currentPage}</span>
                  <span>{totalPages}</span>
                </div>
                <button className='border-2 border-black py-2 px-1 hover:bg-gray-200 focus:bg-gray-200 basis-2/5' 
                  onClick={handleNextPage} disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )
        )}

      </div>
    </>

  )
}

export default MealSearch
