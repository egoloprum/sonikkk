import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { dataFetcher } from "./dataAdder"

const page = async ({}) => {
  const session = await getServerSession(authOptions)
  if (!session) {notFound()}

  return (
    <>
      <PageNavbar pageName="Planner" />
      <div className="pt-16 px-6 sm:px-8 md:px-10 lg:px-12">
        <div className="py-4 flex flex-col gap-4">
          <p className="text-xs sm:text-sm md:text-base">Start planning your meals now.</p>

        </div>
      </div>
    </>
  )
}

export default page
