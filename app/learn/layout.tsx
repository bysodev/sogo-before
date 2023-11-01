"use client";

import dynamic from "next/dynamic";
import SideNavbar from "@/components/side-nav-bar";
// const SideNavbar = dynamic(() => import('@/components/side-nav-bar'), {
//   loading: () => <>SideNavBar</>
// })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <SideNavbar />
      {children}
    </div>
  );
}
