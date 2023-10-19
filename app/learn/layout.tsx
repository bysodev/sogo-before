'use client'

import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation'

const SideNavbar = dynamic(() => import('@/components/side-nav-bar'), {
  loading: () => <>SideNavBar</>
})

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const router = useRouter();
    const path = usePathname();
    
    return (
      <div className='flex w-full'> 
          <SideNavbar/>
          {children}
      </div>
    )
  }