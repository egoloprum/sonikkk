"use client"

import Link from 'next/link'
import { useState, useRef, useEffect, FC } from 'react'

interface DropdownMenuProps {
  image: string | null | undefined
}

const DropdownMenu: FC<DropdownMenuProps> = ({ image }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleButtonClick = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative ml-3" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          onClick={handleButtonClick}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <img className="h-10 w-10 rounded-full" src={image!} alt="" />
        </button>
      </div>

      {dropdownOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={1}
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-200"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-0"
            onClick={handleButtonClick}
          >
            Your Profile
          </Link>
          <hr />
          <Link
            href="/followers"
            className="block px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-200"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-0"
            onClick={handleButtonClick}
          >
            Followers
          </Link>
          <Link
            href="settings"
            className="block px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-200"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-1"
            onClick={handleButtonClick}
          >
            Settings
          </Link>
          <hr />
          {/* <SignOut
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-2"
          >
            Sign out
          </SignOut> */}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
