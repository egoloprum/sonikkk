export async function POST(req: Request) {
  try {
    const body = await req.json()
    const response = await fetch(
      // `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${body.q}`
      `https://www.edamam.com/api/recipes/v2?type=public&_=1727364072720&q=${body.q}`
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
