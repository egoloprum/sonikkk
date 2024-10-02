export async function POST(req: Request) {
  try {
    const body = await req.json()

    const api_key = process.env.RAPID_API_KEY
    const api_host = process.env.RAPID_API_HOST

    const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${body.id}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': `${api_key}`,
        'x-rapidapi-host': `${api_host}`, 
      }
    };

    const response = await fetch(url, options);
    const result = await response.json();

    return new Response(JSON.stringify(result), {
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




