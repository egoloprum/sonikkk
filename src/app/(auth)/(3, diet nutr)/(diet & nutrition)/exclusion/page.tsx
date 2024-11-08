import { getExclusion, getExclusionCount } from "@/app/helpers/exclusionHelper"
import ExclusionClient from "@/components/Diet & Nutrition/ExclusionClient"
import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const session = await getServerSession(authOptions)
  if (!session) {notFound()}

  const user_id = session.user.id
  const exclusion = await getExclusion(user_id)

  let exclusionCount = 0

  if (exclusion) {
    exclusionCount = await getExclusionCount(exclusion.list)
  }

  return (
    <>
      <PageNavbar pageName="Food Exclusions" />
      <div className="py-16 px-6 sm:px-8 md:px-10 lg:px-12 max-w-[800px]">
        <div className="py-4 flex flex-col gap-4">
          <p className="text-xs sm:text-sm md:text-base">
            Add exclusions to filter out recipes from the generator suggestions. Any recipes 
            that match their title or ingredients will not be included in your plans.
          </p>
          <ExclusionClient exclusion={exclusion} user_id={user_id} exclusionCount={exclusionCount} />
        </div>
      </div>
    </>
  )
}

export default page
