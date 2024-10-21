import { MealLikeAdd } from "@/app/helpers/mealHelper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      console.log("User is not authenticated")
      return new Response("Invalid request", { status: 400 })
    }

    if (!session.user.id) {
      console.log("User is not authenticated")
      return new Response("Invalid request", { status: 400 })
    }

    const meal = await req.json()

    const meal_id = meal.meal_id
    const mealLiked = await MealLikeAdd(session.user.id, meal_id)

    return new Response(
      mealLiked ? 
        "OK" : 
        "Invalid request",
      {
        status: mealLiked ? 200 : 400
      }
    )

  } catch (error) {
    console.log(error)

    return new Response('Invalid request', { status: 400 })
  }
}




