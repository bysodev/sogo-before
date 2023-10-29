import { useState } from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import Image from 'next/image';
import logo from '../public/src/logo-min.svg';
import Link from 'next/link';
export default function NavBar({ toggleDarkMode }: any) {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="absolute top-0 w-full">
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href={'#'} className="flex items-center relatieve">
              <Image
                src={logo}
                height={30}
                className="dark:invert mr-0.5 md:mr-1"
                alt="Sogo Sign Logo"
              />
              <span className="text-gray-800 dark:text-gray-200 self-center text-xl md:text-2xl font-bold ">
                ogo Sign
              </span>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-800 dark:text-white rounded-md outline-none  focus:border"
                onClick={() => setNavbar(!navbar)}>
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}>
            <ul className="text-gray-800 hover:text-gray-950 dark:text-white items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 font-medium">
              <li>
                <a href="#">Características</a>{' '}
              </li>
              <li>
                <a href="#">Acerca de</a>{' '}
              </li>
              <li>
                <a href="#">Contacto</a>{' '}
              </li>
              <li>
                <BsFillMoonStarsFill onClick={toggleDarkMode} className="cursor-pointer" />
              </li>
            </ul>

            <div className="w-full mt-3 space-y-2 md:hidden sm:inline-block border p-4 rounded text-center">
              <a href="#" className="inline-block text-gray-800 hover:text-gray-950">
                Iniciar Sesión
              </a>
              <a
                href="#"
                className="inline-block p-3 px-6 w-full font-bold text-white bg-gray-900 rounded-full hover:bg-gray-950 dark:bg-white dark:text-gray-900"
                aria-current="page">
                Unirse
              </a>
            </div>
          </div>
        </div>
        <div className="font-medium hidden space-x-6 md:inline-block dark:text-white">
          <a href="#">Iniciar Sesión</a>
          <a
            href="#"
            className="p-3 px-6 w-full font-bold text-white bg-gray-900 rounded-full hover:bg-gray-950 dark:bg-white dark:text-gray-900">
            Unirse
          </a>
        </div>
      </div>
    </nav>
  );
}
