"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";
import { signOut } from "next-auth/react";

import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";

function SideNavbar() {
  const pathname = usePathname();

  return (
    <div className="flex">
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-white z-20 md:static fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              Menu
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              {routes.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  className={`flex mb-2 ${
                    item.links.includes(pathname)
                      ? "bg-gray-900 shadow-lg text-white"
                      : "hover:bg-gray-700"
                  } justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto text-gray-800 hover:text-white`}
                >
                  {<item.icon color="currentColor" />}
                  <h3 className={`text-base font-semibold`}>{item.name}</h3>
                </Link>
              ))}
              {/* <MdOutlineIntegrationInstructions className={`text-2xl text-gray-600 group-hover:text-white ${ pathname==='/learn' || pathname==='/learn/numeros' || pathname==='/learn/vocales' ? 'text-white' : ''}`} /> */}
            </div>

            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <button
                  onClick={() => signOut()}
                  className="text-base text-gray-800 group-hover:text-white font-semibold "
                  type="button"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;
