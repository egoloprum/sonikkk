"use client"

import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      {children}
      <ProgressBar
        height="4px"
        color="#7bfc03"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}

export default Providers
