import { recipeSavedAll, recipeSavedGetByIds } from "@/app/helpers/recipeHelper"
import RecipeCard from "@/components/Recipe/RecipeCard"
import FilterComp from "@/components/UI/FilterComp"
import LayoutComp from "@/components/UI/LayoutComp"
import PageNavbar from "@/components/UI/PageNavbar"
import SearchComp from "@/components/UI/SearchComp"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const session = await getServerSession(authOptions)

  if (!session) {notFound()}
  const user_id = session.user.id

  const responseSavedRecipes = await recipeSavedAll(user_id)
  const recipes_ids = await responseSavedRecipes.json() 
  
  const savedRecipes = await recipeSavedGetByIds(recipes_ids)

  return (
    <>
      <PageNavbar pageName="Collections" />
      <div className="py-16 px-6 md:px-8 lg:px-10 flex justify-center">
        <div className="py-4 flex flex-col gap-2 sm:gap-4 w-full max-w-[800px]">
          <p className="text-xs sm:text-sm md:text-base">Make collections based on your feelings.</p>

          <div className='py-4 flex flex-wrap gap-4'>
            <FilterComp />
            <SearchComp />
            <LayoutComp />
          </div>


          <div className='py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {savedRecipes.map((recipe: Recipe, index: number) => (
              <RecipeCard recipe={recipe} key={index} />
            ))}
          </div>


        </div>
      </div>
    </>
  )
}

export default page
