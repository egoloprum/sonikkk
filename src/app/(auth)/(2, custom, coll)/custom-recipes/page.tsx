import PageNavbar from "@/components/UI/PageNavbar"
import { createClient } from "@/utils/supabase"
import { CirclePlus, Search } from "lucide-react"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()

  if (!data.user) { notFound() }

  return (
    <>
      <PageNavbar pageName="Custom Recipes" />
      <div className="py-16 px-6 md:px-8 lg:px-10 flex justify-center">
        <div className="py-4 flex flex-col gap-2 sm:gap-4 w-full max-w-[800px]">
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

        </div>
      </div>
    </>
  )
}

export default page
