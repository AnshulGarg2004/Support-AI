import HomeClient from '@/components/HomeClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

const Home = async () => {
    const session = await getSession();
    console.log("Session of user in home : ", session);
    
  return (
    <div>
        <HomeClient email={session?.user?.email!} />
    </div>
  )
}

export default Home
