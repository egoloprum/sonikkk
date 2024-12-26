import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const session = await getServerSession(authOptions)

  if (!session) {notFound()}

  return (
    <>
      <PageNavbar pageName="Help" />
      <div className="py-16 px-6 md:px-8 lg:px-10 flex justify-center">
        <div className="py-4 flex flex-col gap-2 sm:gap-4 w-full max-w-[800px]">
          <p className="text-xs sm:text-sm md:text-base">
            Help
          </p>
        </div>
      </div>
    </>
  )
}

export default page
