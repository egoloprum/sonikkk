import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { FC } from 'react'

interface pageProps {
  
}

function trimDecimalPlaces(str: string) {
  const num = parseFloat(str);
  if (isNaN(num)) {
    throw new Error(`Invalid input: ${str}`);
  }
  return num.toFixed(0);
}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions)

  const response = await fetch('https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=croissant')
  const data = await response.json()

  return (
    <div className='bg-red-300 flex justify-center'>
      <div className='bg-blue-300 max-w-[1200px] m-4 mx-10 p-4'>
        <p className='text-xl font-bold'>Generate meal</p>

        <ul className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
          {data.hits.map((detail: any) => {
            return (
              <li className='relative border-4 border-green-300'>
                <Image 
                  fill
                  referrerPolicy='no-referrer'
                  className='max-h-[20rem] aspect-square object-cover relative'
                  src={detail.recipe.image || ''}
                  alt='food'
                  style={{
                  }}
                />

                <div className='pt-[20rem] flex flex-col bg-yellow-400 h-full'>
                  <p>name: {detail.recipe.label}</p>
                  <p className='bg-red-400 mt-auto'>calories: {trimDecimalPlaces(detail.recipe.calories)}</p>
                </div>
              </li>
            );
          })}
        </ul>

      </div>

    </div>
  )
}

export default page
