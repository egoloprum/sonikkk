import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const session = getServerSession(authOptions)

  if (!session) {notFound()}

  return (
    <>
      <PageNavbar pageName="Food Exclusions" />
      <div className="pt-16 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="py-4 flex flex-col gap-4">
          <p className="text-xs sm:text-sm md:text-base">
            Add exclusions to filter out recipes from the generator suggestions. Any recipes 
            that match their title or ingredients will not be included in your plans.
          </p>
        </div>
      </div>
    </>
  )
}

export default page
