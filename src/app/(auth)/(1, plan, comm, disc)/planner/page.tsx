import PageNavbar from "@/components/UI/PageNavbar"
import { createClient } from "@/utils/supabase"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()

  if (!data.user) { notFound() }

  return (
    <>
      <PageNavbar pageName="Planner" />
      <div className="py-16 px-6 md:px-8 lg:px-10 flex justify-center">
        <div className="py-4 flex flex-col gap-2 sm:gap-4 w-full max-w-[800px]">
          <p className="text-xs sm:text-sm md:text-base">Start planning your meals now.</p>

        </div>
      </div>
    </>
  )
}

export default page
