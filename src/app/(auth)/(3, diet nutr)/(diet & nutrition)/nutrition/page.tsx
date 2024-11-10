import { getNutritionAll } from "@/app/helpers/nutritionHelper"
import NutritionAll from "@/components/Diet & Nutrition/NutritionAll"
import NutritionCreate from "@/components/Diet & Nutrition/NutritionCreate"
import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { Search } from "lucide-react"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const session = await getServerSession(authOptions)
  if (!session) {notFound()}

  const user_id = session.user.id
  let nutritionTargets = [] as NutritionTarget[] 

  try { nutritionTargets = await getNutritionAll(user_id) } 
  catch (error) { console.log(error) }
  
  return (
    <>
      <PageNavbar pageName="Nutrition Targets" />
      <div className="pt-16 px-6 sm:px-8 md:px-10 lg:px-12 max-w-[800px]">
        <div className="py-4 flex flex-col gap-4">
          <p className="text-xs sm:text-sm md:text-base">These store your desired nutrition targets. 
            You can use the same targets for every day of the week, or give different profiles to 
            different days (like workout vs rest days).
          </p>

          <div className="">
            <div className="flex flex-col md:flex-row gap-4">

              <NutritionCreate user_id={user_id} />

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

          <NutritionAll nutritionTargets={nutritionTargets} />

        </div>
      </div>
    </>
  )
}

export default page
