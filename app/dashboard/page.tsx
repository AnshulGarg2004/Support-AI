import DashboardClient from '@/components/DashboardClient'
import { getSession } from '@/lib/getSession'
import React from 'react'

const Dashboard = async () => {
  const session = await getSession();
  const userId = session?.user?.id!;
  return (
    <div>
      <DashboardClient ownerId={userId} />
    </div>
  )
}

export default Dashboard
