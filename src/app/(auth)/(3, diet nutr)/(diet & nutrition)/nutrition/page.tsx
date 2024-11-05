import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const session = getServerSession(authOptions)

  if (!session) {notFound()}

  return (
    <>
      <PageNavbar pageName="Nutrition Targets" />
      <div className="pt-16 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="py-4 flex flex-col gap-4">
          <p className="text-xs sm:text-sm md:text-base">These store your desired nutrition targets. 
            You can use the same targets for every day of the week, or give different profiles to 
            different days (like workout vs rest days).
          </p>

        </div>
      </div>
    </>
  )
}

export default page
