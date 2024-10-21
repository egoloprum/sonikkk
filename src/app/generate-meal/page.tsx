import MealSearch from '@/components/Meal/MealSearch'
import { authOptions } from '@/lib/auth'
import axios from 'axios'
import { getServerSession } from 'next-auth'

interface SearchParams {
  search: string;
}

const page = async ({
  searchParams
} : {searchParams: SearchParams} ) => {
  const session = await getServerSession(authOptions)
  const search = searchParams.search

  // in the test
  // const endpoint = 'http://localhost:3000/api/meal/all'
  const endpoint = 'https://sonikkk.vercel.app/api/meal/all'

  let results = []

  if (search && search.length) {
    const response = await axios.post(endpoint, {"name": search})
    results = response.data
  }

  return (
    <div className='flex flex-col justify-center'>
      <MealSearch sessionId={session?.user.id} serverSearch={search} serverResults={results} />
    </div>
  )
}

export default page
