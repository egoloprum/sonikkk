import { MealExists, MealLikeRemove } from "@/app/helpers/mealHelper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      console.log("User is not authenticated")
      return new Response("Invalid request", { status: 400 })
    }

    const meal = await req.json()
    const mealExists = await MealExists(meal.id)

    if (!mealExists) {
      return new Response("Invalid request", {status: 400})
    }

    const mealRemoved = await MealLikeRemove(session.user.id, meal.id)

    return new Response(
      mealRemoved ? 
        "OK" : 
        "Invalid request",
      {
        status: mealRemoved ? 200 : 400
      }
    )

  } catch (error) {
    console.log(error)

    return new Response('Invalid request', { status: 400 })
  }
}




