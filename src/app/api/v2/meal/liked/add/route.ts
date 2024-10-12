import { MealCreator, MealExists, MealLikeAdd } from "@/app/helpers/mealHelper";
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
    const mealExistsId = await MealExists(meal.id) as string

    if (!mealExistsId) {
      const mealCreateData = await MealCreator(meal)

      if (mealCreateData instanceof Response) {
        return mealCreateData
      }

      const mealCreated = mealCreateData.mealCreated
      const meal_id = mealCreateData.meal_id

      if (mealCreated && meal_id) {
        const mealNewLiked = await MealLikeAdd(session.user.id, meal_id)

        return new Response(
          mealNewLiked ? 
            "OK" : 
            "Invalid request",
          {
            status: mealNewLiked ? 200 : 400
          }
        )
      }
    }

    const mealLiked = await MealLikeAdd(session.user.id, mealExistsId)

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




