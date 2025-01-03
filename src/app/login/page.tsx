import SignInAnon from "@/components/SignIn/Sign-in-Anon"
import SignInGoogle from "@/components/SignIn/Sign-in-Google"
import { createClient } from "@/utils/supabase"
import { redirect } from "next/navigation"

const page = async () => {

  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()

  if (data.user) { redirect("/planner") }

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

          <SignInAnon className="bg-black_bg_btn border border-black_border p-4 flex text-black_text_primary
            items-center gap-2 justify-center rounded-[0.35rem]">
            Sign in anonymously
          </SignInAnon>

          <SignInGoogle className="bg-black_bg_btn border border-black_border p-4 flex text-black_text_primary
            items-center gap-2 justify-center rounded-[0.35rem]">Sign in with google</SignInGoogle>
        </div>

      </div>



    </div>
  )
}

export default page
