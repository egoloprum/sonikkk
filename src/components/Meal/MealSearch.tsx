'use client'

import axios from 'axios'
import { Loader2, Search } from 'lucide-react'
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
      router.push(`/discover?search=${serverSearch}&page=${newPage}&totalPages=${totalPage}`)
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
      router.push(`/discover?search=${searchInput}&page=${newPage}&totalPages=${newTotalPages}`);
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
        router.push(`/discover?search=${searchInput}&page=${newPage}&totalPages=${totalPage}`)
      }
      catch (error) { console.error(error); setSearchResults([]) } 
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
      <form onSubmit={handleSubmit} className='flex justify-center'>
        <div className="border-2 rounded border-gray-300 focus-within:border-gray_border relative">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text" className="px-4 py-2 mr-6 outline-none w-full dark:bg-black_extra bg-white_extra" placeholder="Enter your meal..." 
          />

          <Search className='absolute top-2 right-2' />
        </div>
          {/* <button className="btn" type='submit'>Search</button> */}

      </form>

      <div className='flex flex-col py-4 gap-4 sm:gap-6 md:gap-8'>
        {isLoading ? (
          <div className='flex justify-center'>
            <Loader2 className='animate-spin h-8 w-8' />
          </div>
        ) : (
          !paginatedResults() || !paginatedResults().length ? (
            <p className='text-xs sm:text-sm md:text-base'>Nothing to show</p>
          ) : (
            <>
              <div className='flex flex-col gap-2 sm:gap-4 md:gap-6'>
                {paginatedResults().map((mealDetail: Meal) => (
                  <MealCard whereRendered={true} key={mealDetail.meal_id} mealDetail={mealDetail} />
                ))}
              </div>

              <div className='flex justify-center gap-2 sm:gap-4 max-w-[15rem] sm:max-w-[25rem] w-full place-self-center text-xs sm:text-sm md:text-base'>
                <button className='border-2 border-black py-1 sm:py-2 px-1 hover:bg-gray-200 focus:bg-gray-200 basis-2/5' 
                  onClick={handlePreviousPage} disabled={currentPage === 1}
                >
                  Previous
                </button>
                <div className='border-2 p-1 sm:p-2 basis-1/5 flex justify-center gap-4'>
                  <span>{currentPage}</span>
                  <span>{totalPages}</span>
                </div>
                <button className='border-2 border-black py-1 sm:py-2 px-1 hover:bg-gray-200 focus:bg-gray-200 basis-2/5' 
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
