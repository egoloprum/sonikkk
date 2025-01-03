import { createClient } from "@/utils/supabase";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()

  if (data.user) { redirect("/planner") }

  return (
    <div className="text-black_text_primary">
      <p>Welcome</p>
    </div>
  );
}
