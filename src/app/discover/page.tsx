import RecipeSearch from '@/components/Recipe/RecipeSearch'
import RecipeTable from '@/components/Recipe/RecipeTable'
import PageNavbar from '@/components/UI/PageNavbar'
import { notFound } from 'next/navigation'
import { recipeSearch } from '../helpers/recipeHelper'
import { createClient } from '@/utils/supabase'

interface SearchParams {
  query:    string
  page:     string
}

const page = async ({
  searchParams
} : {searchParams: Promise<SearchParams>} ) => {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()

  if (!data.user) { notFound() }

  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';

  let recipeData = null

  if (query.length) {
    recipeData = await recipeSearch(query)
  }

  return (
    <>
      <PageNavbar pageName="Discover" />
      <div className="py-16 px-6 md:px-8 lg:px-10 flex justify-center">
        <div className="py-4 flex flex-col gap-2 sm:gap-4 w-full max-w-[800px]">
          <p className="text-xs sm:text-sm md:text-base">Look for some recipes.</p>

          <RecipeSearch />
          <RecipeTable recipeData={recipeData} query={query} />
        </div>
      </div>
    </>
  )
}

export default page
