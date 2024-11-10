import { createPrimaryDiet, getPrimaryDiet } from "@/app/helpers/dietHelper"
import DietClient from "@/components/Diet & Nutrition/DietClient"
import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { notFound } from "next/navigation"

const page = async ({}) => {
  const session = await getServerSession(authOptions)

  if (!session) {notFound()}

  const user_id = session.user.id
  const primaryDiet = await getPrimaryDiet(user_id) as PrimaryDiet

  if (!primaryDiet) { await createPrimaryDiet(user_id) }

  return (
    <>
      <PageNavbar pageName="Primary Diet" />
      <div className="py-16 px-6 sm:px-8 md:px-10 lg:px-12 max-w-[800px]">
        <div className="py-4 flex flex-col gap-4">
          <p className="text-xs sm:text-sm md:text-base">
            <span>
              We will base your meals off this main main diet type. 
              Choose Anything to customize your own unique diet from 
              scratch and set specific exclusions from the
            </span>
            <Link href='/exclusion' className="underline underline-offset-4 ml-2">Exclusions menu screen.</Link>
          </p>

          <DietClient primaryDiet={primaryDiet} user_id={user_id} />

        </div>
      </div>
    </>
  )
}

export default page
