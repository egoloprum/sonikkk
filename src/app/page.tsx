import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions)

  // if (!session) notFound()

  return (
    <div className="">
      
      {!session ? (
        <div>go login</div>
      ) : (
        <div>Welcome</div>
      ) }
      
    </div>
  );
}
