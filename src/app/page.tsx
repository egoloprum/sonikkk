import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)

  // if (!session) notFound()

  return (
    <div className="">
      
      {!session ? (
        <div>go login</div>
      ) : (
        <div>go logout</div>
      ) }
      
    </div>
  );
}
