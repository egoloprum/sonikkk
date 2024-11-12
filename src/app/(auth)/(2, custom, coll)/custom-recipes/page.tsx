import RecipeCard from "@/components/Meal/RecipeCard"
import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { CirclePlus, Search } from "lucide-react"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const session = await getServerSession(authOptions)

  if (!session) {notFound()}

  return (
    <>
      <PageNavbar pageName="Custom Recipes" />
      <div className="py-16 px-6 sm:px-8 md:px-10 lg:px-12 max-w-[800px]">
        <div className="py-4 flex flex-col gap-4">
          <p className="text-xs sm:text-sm md:text-base">Cant find your home-made meal? Create one below</p>

          <div className="">
            <div className="flex flex-col md:flex-row gap-4">
              <p className="border-2 flex items-center gap-2 p-2 rounded w-full max-w-60 cursor-pointer hover:bg-black_extra">
                <CirclePlus />
                <span className="text-sm">Create Custom Recipe</span>
              </p>

              <div className="border-2 rounded border-white_mid focus-within:border-white_hover relative max-w-60">
                <input type="text" placeholder="Search..." 
                  className="px-4 py-2 mr-6 outline-none text-sm sm:text-base dark:bg-black_mid bg-white_extra" 
                />
                <Search className='absolute top-2 right-2' />
              </div>

              <select name="" id="" className="bg-black_mid border-2 p-2 rounded w-fit md:ml-auto text-xs sm:text-sm md:text-base">
                <option value="">Name</option>
                <option value="">Recent</option>
              </select>
            </div>
          </div>

          <div className="py-4 flex gap-4 flex-wrap">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>

        </div>
      </div>
    </>
  )
}

export default page
