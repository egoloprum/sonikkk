import MealSearch from '@/components/Meal/MealSearch'
import PageNavbar from '@/components/UI/PageNavbar'
import { authOptions } from '@/lib/auth'
import axios from 'axios'
import { getServerSession } from 'next-auth'

interface SearchParams {
  search:   string
  page:     string
  per_page: string
}

const page = async ({
  searchParams
} : {searchParams: SearchParams} ) => {
  const session = await getServerSession(authOptions)

  const search    = searchParams.search
  const isProduction = process.env.PRODUCTION_OR_DEVELOPMENT === 'production'
  
  let endpoint = '';
  if (isProduction) { endpoint = 'http://localhost:3000/api/meal/all' }
  else { endpoint = 'https://sonikkk.vercel.app/api/meal/all' }

  let results = []
  if (search && search.length) {
    const response = await axios.post(endpoint, {"name": search})
    results = response.data
  }

  return (
    <>
      <PageNavbar pageName="Discover" />

      <div className='pt-16 px-6 sm:px-8 md:px-10 lg:px-12 '>
        <div className='py-4 gap-4 flex flex-col justify-center'>
          <MealSearch 
            sessionId={session?.user.id} 
            serverSearch={search} 
            serverResults={results} 
            isProduction={isProduction} 
          />
        </div>
      </div>
    </>
  )
}

export default page
