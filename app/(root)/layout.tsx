
import React, {ReactNode} from 'react'
import { StreamVideoProvider } from '@/providers/StreamClientProviders'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "ArenaMeet",
  description: "Video Calling App",
  icons:{
    icon : '/icons/logo.svg'
  }
};

const RootLayout = ({children}:{children :ReactNode}) => {
  return (
    <main>
        <StreamVideoProvider>
          {children}
        </StreamVideoProvider>      
    </main>
  )
}

export default RootLayout