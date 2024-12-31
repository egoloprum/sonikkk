import { LayoutGrid, List } from 'lucide-react'
import { FC } from 'react'

interface LayoutCompProps {
  className?: string
}

const LayoutComp: FC<LayoutCompProps> = ({className}) => {
  return (
    <div className={`${className} md:ml-auto border rounded dark:border-black_border border-white_border flex gap-2 w-fit`}>
      <div className='hover:bg-black_hover rounded py-1 px-3 m-1 flex justify-center items-center'>
        <LayoutGrid className='' />
      </div>
      
      <div className='hover:bg-black_hover rounded px-3 m-1 flex justify-center items-center'>
        <List className=''/>
      </div>
  </div>
  )
}

export default LayoutComp
