import SignIn from "@/components/Sign-in"
import { authOptions } from "@/lib/auth"
import { User } from "lucide-react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const page = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("planner")
  }

  return (
    <div className="p-4 flex justify-center items-center h-[calc(100vh-100px)]">

      <div className="bg-black_bg_card p-4 max-w-[25rem] w-full flex flex-col gap-4 rounded-xl text-white">

        <div className="border-b border-black_line py-2">
          <p className="font-bold text-2xl text-black_text_primary">Welcome back</p>
          <p className="text-black_text font-bold text-black_text_secondary">Sign in your account</p>
        </div>

        <div className="flex flex-col gap-4 border-b border-black_line pb-4">
          <input className="bg-black_mid border-black_border outline-none p-3 rounded-[0.35rem]" type="text" placeholder="Username" />
          <input className="bg-black_mid border-black_border outline-none p-3 rounded-[0.35rem]" type="text" placeholder="Password" />
        </div>

        <div className="flex flex-col gap-4">

          <button className="bg-black_bg_btn border border-black_border p-4 flex text-black_text_primary
            items-center gap-2 justify-center rounded-[0.35rem]">
            <User />
            <p>Sign in anonymously</p>
          </button>

          <SignIn className="bg-black_bg_btn border border-black_border p-4 flex text-black_text_primary
            items-center gap-2 justify-center rounded-[0.35rem]">Sign in with google</SignIn>
        </div>

      </div>



    </div>
  )
}

export default page
