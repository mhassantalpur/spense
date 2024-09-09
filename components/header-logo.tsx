import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const HeaderLogo = () => {
  return (
    <Link href='/' >
        <div className='items-center hidden lg:flex'>
            <Image src='/logo.png' alt='Logo' height={65} width={65} />
            <p className='font-semibold text-white text-2xl ml-2.5'>
                Spense
            </p>
        </div>
    </Link>
  )
}

export default HeaderLogo