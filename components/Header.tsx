// import React from 'react'
// import HeaderLogo from './header-logo'
// import Navigation from './navigation'
// import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
// import { Loader2 } from 'lucide-react'
// import WelcomeMsg from './welcome-msg'
// import { Filters } from './filters'

// const Header = () => {
//   return (
//     <header className='bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-20'>
//         <div className='max-w-screen-6xl mx-auto'>
//             <div className='w-full flex items-center justify-between mb-14'>
//                 <div className='flex items-center lg:gap-x-16'>
//                     <HeaderLogo />
//                     <Navigation />
//                 </div>
//                 <ClerkLoaded>
//                     <UserButton afterSwitchSessionUrl='/'/>
//                 </ClerkLoaded>
//                 <ClerkLoading>
//                     <Loader2 className='size-8 animate-spin text-slate-400' />
//                 </ClerkLoading>
//             </div>
//             <WelcomeMsg />
//             {/* <Filters /> */}
//         </div>
//     </header>
//   )
// }

// export default Header

"use client"

import React from 'react'
import HeaderLogo from './header-logo'
import Navigation from './navigation'
import { UserButton, ClerkLoading, ClerkLoaded, useAuth } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import WelcomeMsg from './welcome-msg'
import { useState, useEffect } from 'react'
import { Filters } from './filters'

const Header = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-20'>
        <div className='max-w-screen-6xl mx-auto'>
            <div className='w-full flex items-center justify-between mb-14'>
                <div className='flex items-center lg:gap-x-16'>
                    <HeaderLogo />
                    <Navigation />
                </div>
                
                {/* Only render on client side */}
                {mounted ? (
                  <UserButton afterSwitchSessionUrl='/'/>
                ) : (
                  <Loader2 className='size-8 animate-spin text-slate-400' />
                )}
            </div>
            <WelcomeMsg />
            <Filters />
        </div>
    </header>
  )
}

export default Header