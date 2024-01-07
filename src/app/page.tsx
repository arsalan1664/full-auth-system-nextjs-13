import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Sidebar } from '@/app/components/Sidebar/Sidebar'
import React from 'react'

interface ProtectedLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {

  const session = await getServerSession(authOptions);


  if(!session || !session.user?.email) {
      return (
          <div>
              This is protected and you do not have access to it.
          </div>
      )
  }

return (
  <>
      {children}
  </>
);
}



const DashboardPage = () => {
  return (
    <ProtectedLayout>
    <div className="grid lg:grid-cols-6">
    <Sidebar/>
    <div className="col-span-3 lg:col-span-5 lg:border-l">
      <div className="h-full px-2 py-6 lg:px-2">
        <h1 className='flex items-center justify-center h-[80vh] text-forground text-3xl' >App</h1>
      </div>
    </div>
  </div>
  </ProtectedLayout>
  )
}

export default DashboardPage