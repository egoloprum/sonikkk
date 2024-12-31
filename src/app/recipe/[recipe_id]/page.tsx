import { recipeGetById, recipeLikedAlready, recipeSavedAlready } from "@/app/helpers/recipeHelper";
import RecipeForm from "@/components/Recipe/RecipeForm";
import PageNavbar from "@/components/UI/PageNavbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    recipe_id: string
  }
}

const page = async ({ params }: { params: Promise<pageProps['params']> }) => {
  const resolvedParams = await params
  const { recipe_id } = resolvedParams

  const session = await getServerSession(authOptions)
  if (!session) { notFound() }
  const user_id = session.user.id 

  const recipe = await recipeGetById(recipe_id)

  const likedResponse = await recipeLikedAlready(recipe_id, user_id)
  const likedData = await likedResponse.json()
  const likedAlready = likedData.likedAlready
  
  const savedResponse = await recipeSavedAlready(recipe_id, user_id)
  const savedData = await savedResponse.json()
  const savedAlready = savedData.savedAlready

  return (
    <>
    <PageNavbar pageName={recipe?.food_name || ""} />
    <div className="py-16 px-6 md:px-8 lg:px-10 flex justify-center">
      <div className="py-4 flex flex-col gap-2 sm:gap-4 w-full max-w-[800px]">

        <div className="py-2 sm:py-4 flex flex-col md:flex-row gap-2 sm:gap-4 md:gap-8">
          
          {/* left side */}
          <div className="basis-1/2 flex flex-col gap-2 sm:gap-4">
            <div className='overflow-hidden w-full'>
              <img src={recipe?.images.image || '/default_image_recipe.jpg'} 
                className='w-full h-full rounded' alt="" loading='lazy' />
            </div>

            <div className="w-full flex justify-center">
              <RecipeForm user_id={user_id} recipe_id={recipe_id} likedAlready={likedAlready} savedAlready={savedAlready} />
            </div>


            <div className="py-2 sm:py-4 flex flex-col gap-2 sm:gap-4">
              <p className="text-base sm:text-lg md:text-xl font-bold">Nutrition</p>

              <div className="flex flex-col gap-1.5">
                {Object.entries(recipe?.nutritions ?? {}).map(([key, value]) => (
                  <p key={key} className="flex gap-2 justify-between text-sm sm:text-base">
                    <span>{key}</span>
                    <span>{value || 0}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="basis-1/2 flex flex-col gap-2 sm:gap-4">
            <div className="py-2 sm:py-4">
              <p className="flex gap-2 justify-between text-sm sm:text-base">
                <span>Prep Time</span>
                <span>{recipe?.prep_time || 0}</span>
              </p>
              <p className="flex gap-2 justify-between text-sm sm:text-base">
                <span>Cook Time</span>
                <span>{recipe?.prep_time || 0}</span>
              </p>
            </div>

            <div className="py-2 sm:py-4 flex flex-col gap-2 sm:gap-4">
              <p className="text-base sm:text-lg md:text-xl font-bold">Ingredients</p>

              <div className="flex flex-col gap-1.5">
                {recipe?.ingredients.map((ingred) => (
                  <p key={ingred.name} className="text-sm sm:text-base relative">
                    <span className="border border-white_border dark:border-black_border rounded-full w-1 h-1 
                      sm:w-2 sm:h-2 absolute top-2 sm:top-2.25 left-0"></span>
                    <span className="pl-4">{ingred.name}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="py-2 sm:py-4 flex flex-col gap-2 sm:gap-4">
              <p className="text-base sm:text-lg md:text-xl font-bold">Directions</p>

              <div className="flex flex-col gap-1.5">
                {recipe?.directions.map((dir, index: number) => (
                  <p key={index + 1} className="text-sm sm:text-base flex gap-2">
                    <span className="dark:text-black_border">{index + 1}.</span>
                    <span>{dir}</span>
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </>
  )
}

export default page
