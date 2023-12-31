import React from 'react'

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className='flex w-full'>  
            {children}
        </div>
    )
  }