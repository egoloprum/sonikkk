import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions)

  // if (!session) notFound()

  return (
    <div className="">
      {!session ? (<div className="text-xs sm:text-sm md:text-base">go login</div>) 
        : (<div className="text-xs sm:text-sm md:text-base">Welcome</div>)
      }
    </div>
  );
}
