import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("planner")
  }

  return (
    <div className="text-black_text_primary">
      <p>Welcome</p>
    </div>
  );
}
