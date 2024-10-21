import { MealSelectDetail } from "@/app/helpers/mealHelper"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const response = await MealSelectDetail(body.meal_id)

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    console.log(error)

    return new Response('Invalid request', { status: 400 })
  }
  finally {}
}




