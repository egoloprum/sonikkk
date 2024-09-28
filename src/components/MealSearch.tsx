'use client'

import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import MealCard from './MealCard'
import { useRouter } from 'next/navigation'

interface MealSearchProps {
  sessionId?: string
}

interface SearchResultProps {
  hits: {
    [key: string]: any;
  }[];
}

const MealSearch: FC<MealSearchProps> = ({
  sessionId
}) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResultProps>({ hits: [] })
  const [searchPagination, setSearchPagination] = useState()

  const router = useRouter()

  useEffect(() => storePathValues, [router]);

  // function that stores prev value in session storage
  function storePathValues() {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;

    const prevPath = storage.getItem("currentPath");
    if (prevPath) {
      storage.setItem("prevPath", prevPath);
    }

    storage.setItem("currentPath", globalThis.location.pathname);
  }

  // deletes created cache after 10 mins without hard-refreshing or directing from non-child path
  useEffect(() => {
    const storage = globalThis?.sessionStorage;

    if (storage) {
      const prevPath = storage.getItem("currentPath");
      if (prevPath && !prevPath.startsWith("/generate-meal/")) {
        storage.removeItem('searchQuery');
        storage.removeItem('searchResults');
        storage.removeItem('pagination');
      }
    }

    const timeoutId = setTimeout(() => {
      if (typeof window !== 'undefined') {
        storage.removeItem('searchQuery');
        storage.removeItem('searchResults');
        storage.removeItem('pagination');
      }
    }, 10 * 60 * 1000); // 10 minutes
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    if (!storage) {return}

    const storedSearchQuery = storage.getItem("searchQuery");
    const storedSearchResults = storage.getItem("searchResults");

    if (storedSearchQuery && storedSearchResults) {

      setSearchQuery(storedSearchQuery)
      setSearchResults(JSON.parse(storedSearchResults))

      fetchSearchResults({
        "q": storedSearchQuery,
        "health": "",
        "diet": "",
        "calories": "",
        "ingr": "",
      })
    }
  }, [])

  const fetchSearchResults = async (mealData: any) => {
    const storage = globalThis?.sessionStorage;
    if (!storage) {return}

    try {
      setIsLoading(true)

      const response = await axios.post('/api/meal/all', mealData)
      const results = response.data

      setSearchResults(results)
      storage.setItem('searchResults', JSON.stringify(results));

    } catch (error) {
      console.error(error)
      setSearchResults({ hits: [] })
      storage.setItem('searchResults', '');
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!searchQuery.replaceAll(' ', '')) {
      console.log('L bozo')
      return
    }

    const storage = globalThis?.sessionStorage;
    if (!storage) {return}

    storage.setItem('searchQuery', searchQuery);

    if (searchQuery) {
      fetchSearchResults({
        "q": searchQuery,
        "health": "",
        "diet": "",
        "calories": "",
        "ingr": "",
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='border-4 border-red-200 py-2 flex flex-col gap-4 mb-4'>
        <div className='flex flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap justify-center align-center gap-4'>

          <label className="input input-bordered flex items-center gap-2 w-full max-w-[20rem]">
            <input
              onChange={(e) => {setSearchQuery(e.target.value)}}
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

        <div className='flex flex-wrap md:flex-nowrap lg:flex-wrap xl:flex-nowrap justify-center align-center gap-4 px-4'>

          <div className="dropdown w-full max-w-[10rem]">
            <div tabIndex={0} role="button" className="btn m-1 w-full rounded">Calories</div>
            <ul tabIndex={0} className="dropdown-content bg-base-100 rounded z-[1] w-40 p-2 shadow flex flex-col gap-2">
              <li className='flex flex-row w-full gap-4 justify-center'>
                <span className='underline underline-offset-4 decoration-2 text-sm self-center'>From</span>
                <input className='pl-1 ml-auto w-full max-w-[5rem] outline-none border-2 rounded' type="number" min='0' max='10000' />
              </li>
              <li className='flex flex-row w-full gap-4'>
                <span className='underline underline-offset-4 decoration-2 text-sm self-center'>To</span>
                <input className='pl-1 ml-auto w-full max-w-[5rem] outline-none border-2 rounded' type="number" min='0' max='10000' />
              </li>
            </ul>
          </div>

          <div className="dropdown w-full max-w-[10rem]">
            <div tabIndex={0} role="button" className="btn m-1 w-full rounded">Ingredients</div>
            <ul tabIndex={0} className="dropdown-content bg-base-100 rounded z-[1] w-44 p-2 shadow flex flex-col gap-2">
              <li className='flex flex-row w-full gap-4 justify-center'>
                <span className='underline underline-offset-4 decoration-2 text-sm self-center'>Up to</span>
                <input className='pl-1 ml-auto w-full max-w-[5rem] outline-none border-2 rounded' type="number" min='0' max='20' />
              </li>
            </ul>
          </div>

          <div className="dropdown w-full max-w-[10rem]">
            <div tabIndex={0} role="button" className="btn m-1 w-full rounded">Diet</div>
            <ul tabIndex={0} className="dropdown-content bg-base-100 rounded z-[1] w-[24rem] p-2 shadow grid grid-cols-2 gap-2">
              <div onClick={() => console.log("helllooooo")} className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2 text-sm'>Vegetarian</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Vegan</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Paleo</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>High-Fiber</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>High-Protein</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Low-Carb</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Low-Fat</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Low-Sodium</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
              <span className='underline underline-offset-4 decoration-2'>Low-Sugar</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
              <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Alcohol-Free</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
              <span className='underline underline-offset-4 decoration-2'>Balanced</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Immunity</span>
              </div>
            </ul>
          </div>

          <div className="dropdown w-full max-w-[10rem]">
            <div tabIndex={0} role="btn" className="btn m-1 w-full rounded">Allergies</div>
            <ul tabIndex={0} className="dropdown-content bg-base-100 rounded z-[1] w-[18rem] p-2 shadow grid grid-cols-2 gap-2">
              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2 text-sm'>Gluten</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Dairy</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Eggs</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Soy</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Wheat</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Fish</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Shellfish</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
                <span className='underline underline-offset-4 decoration-2'>Tree nuts</span>
              </div>

              <div className="btn btn-ghost flex justify-start p-2">
                <input type="checkbox" className="checkbox size-5" />
              <span className='underline underline-offset-4 decoration-2'>Peanuts</span>
              </div>
            </ul>
          </div>
        </div>

      </form>

      <div className='flex flex-col gap-8'>
        
        {isLoading ? (
          <Loader2 className='animate-spin h-4 w-4' />
        ) : (
          !searchResults.hits.length ? (
            <p>Nothing to show</p>
          ) : (
            <>
              <div className='border-4 border-red-400 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
                {searchResults.hits.map((mealDetail: any) => (
                  <MealCard mealDetail={mealDetail} />
                ))}
              </div>


              <div className='border-4 border-red-400 w-full flex justify-center'>
                <div className="join bg-red-500 flex w-full max-w-[40rem]">
                  <button className="flex-1 join-item btn">1</button>
                  <button className="flex-1 join-item btn">2</button>
                  <button className="flex-1 join-item btn btn-disabled">...</button>
                  <button className="flex-1 join-item btn">99</button>
                  <button className="flex-1 join-item btn">100</button>
                </div>
              </div>

            </>
          )
        )}

      </div>
    </>

  )
}

export default MealSearch
