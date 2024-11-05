import { FC } from 'react'

interface PageNavbarProps {
  pageName: string
}

const PageNavbar: FC<PageNavbarProps> = ({
  pageName
}) => {
  return (
    <div className='fixed w-full p-4 px-6 sm:px-8 md:px-10 lg:px-12 dark:bg-black_extra bg-white_extra lg:text-2xl md:text-xl sm:text-base
      font-bold border-b-2 border-white_hover dark:border-black_mid text-nowrap overflow-hidden z-10 select-none'>
      {pageName}
    </div>
  )
}

export default PageNavbar
