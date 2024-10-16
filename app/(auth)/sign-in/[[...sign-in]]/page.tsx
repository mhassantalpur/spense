import React from 'react'
import { Loader2 } from 'lucide-react';
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import Image from 'next/image';

const SignInPage = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
      <div className='h-full lg:flex flex-col items-center justify-center px-4'>
        <div className='text-center space-y-4 pt-16'>
          <h1 className='font-bold text-3xl text-muted-foreground text-[#2e2a47]'>
            Welcome Back
          </h1>
          <p className='text-base text-[#7e8ca0]'>
            Log in to resume your finance journey
          </p>
        </div>
        <div className='flex items-center justify-center mt-8'>
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className='animate-spin text-muted-foreground' />
          </ClerkLoading>
        </div>
      </div>
      <div className='h-full bg-[#144a63] hidden lg:flex items-center justify-center'>
          <Image src="/logo.png" height={500} width={500} alt='Logo' />
        </div>
    </div>
  )
}

export default SignInPage;