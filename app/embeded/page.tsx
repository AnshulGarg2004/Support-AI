import EmbededClient from '@/components/EmbededClient';
import { getSession } from '@/lib/getSession'
import React from 'react'

const EmbededPage = async () => {
    const session = await getSession();
  return (
    <div>
      <EmbededClient ownerId={session?.user?.id!}/>
    </div>
  )
}

export default EmbededPage
