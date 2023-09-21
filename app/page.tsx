'use client'
import { userStore } from '@/store/user';
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation';
import {useEffect} from 'react'
export default function Home() {

  const pathname = usePathname();

  console.log('Desde Page: ' + pathname)

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h6>COMENZAMOS</h6>
    </div>
  )
}
