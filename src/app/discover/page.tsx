import RecipeSearch from '@/components/Recipe/RecipeSearch'
import RecipeTable from '@/components/Recipe/RecipeTable'
import PageNavbar from '@/components/UI/PageNavbar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { recipeSearch } from '../helpers/recipeHelper'

interface SearchParams {
  query:    string
  page:     string
}

const page = async ({
  searchParams
} : {searchParams: Promise<SearchParams>} ) => {
  const session = await getServerSession(authOptions)
  if (!session) { notFound }

  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';

  let recipeData = null

  if (query.length) {
    recipeData = await recipeSearch(query)
  }

  console.log(recipeData?.length)

  return (
    <>
      <PageNavbar pageName="Discover" />
      <div className="pt-16 px-6 sm:px-8 md:px-10 lg:px-12 max-w-[800px]">
        <div className="py-4 flex flex-col gap-4">
          <p className="text-xs sm:text-sm md:text-base">Look for some recipes.</p>

          <RecipeSearch />
          <RecipeTable recipeData={recipeData} />
        </div>
      </div>
    </>
  )
}

export default page
