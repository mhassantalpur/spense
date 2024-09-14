import React from 'react'
import Header from '@/components/Header'

type Props = {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
        <Header />
        <main className='px-3 bg-white lg:px-14'>{children}</main>
    </>
  )
}

export default DashboardLayout