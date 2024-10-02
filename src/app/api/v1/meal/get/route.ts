export async function POST(req: Request) {
  try {
    const { mealId } = await req.json()
    const response = await fetch(
      `https://www.edamam.com/api/recipes/v2/${mealId}?type=public`
    )
    
    const data = await response.json()

    return new Response(JSON.stringify(data), {
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
