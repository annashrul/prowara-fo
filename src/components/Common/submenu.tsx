import React, { useState } from 'react'
import { Transition } from '@windmill/react-ui'
import Link from 'next/link'

interface iWidget{
    title: string;
    link: string;
    icon: JSX.Element;
    isActive?: boolean;
    routes:Array<iSub>;
}
interface iSub{
    title: string;
    link: string;
    icon: JSX.Element;
}

const Widget: React.FC<iWidget> = ({ title, icon, routes }) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen)
  }

  return (
    <li className="relative px-6 py-3" key={title}>
      <button
        className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
        onClick={handleDropdownMenuClick}
        aria-haspopup="true"
      >
        <span className="inline-flex items-center">
          {icon}
          <span className="ml-4">{title}</span>
        </span>
        <svg fill="currentColor" viewBox="0 0 20 20"className="inline w-4 h-4 transition-transform duration-200 transform">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <Transition
        show={isDropdownMenuOpen}
        enter="transition-all ease-in-out duration-300"
        enterFrom="opacity-25 max-h-0"
        enterTo="opacity-100 max-h-xl"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100 max-h-xl"
        leaveTo="opacity-0 max-h-0"
      >
        <ul
          className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
          aria-label="submenu"
        >
          {routes.map((r) => (
            <li
              className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              key={r.title}
            >
              <Link href={r.link}>
                  <a className="w-full" >
                    {r.title}
                  </a>
              </Link>
            </li>
          ))}
        </ul>
      </Transition>
    </li>
  )
}

export default Widget