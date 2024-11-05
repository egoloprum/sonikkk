import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const session = getServerSession(authOptions)

  if (!session) {notFound()}

  return (
    <>
      <PageNavbar pageName="Primary Diet" />
      <div className="pt-16 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="py-4 flex flex-col gap-4">
          <p className="text-xs sm:text-sm md:text-base">We'll base your meals off this main main diet type. 
            Choose "Anything" to customize your own unique diet from scratch and set specific exclusions from the Exclusion
          </p>
        </div>
      </div>
    </>
  )
}

export default page
