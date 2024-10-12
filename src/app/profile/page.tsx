import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions)

  if (!session) { notFound() }

  const {data} = await supabase
    .from("liked_meal")
    .select('*')
    .eq('user_id', session.user.id)

  console.log(data)

  return (

    <div>
      {session.user.name}
    </div>


  )
}

export default page
