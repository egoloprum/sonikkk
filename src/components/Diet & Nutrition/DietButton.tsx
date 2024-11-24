import { FC } from 'react'
import { useFormStatus } from 'react-dom'

import { Sandwich, Wheat, Cherry, Drumstick, Vegan, LeafyGreen, Loader2 } from 'lucide-react';
import { ForwardRefExoticComponent, SVGProps } from 'react';

type IconMap = {
  [key: string]: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
};

type Diet = {
  name: string
  exclusion: string
  icon: string
  excludeList: string[]
}

const iconMap: IconMap = {
  Sandwich: Sandwich,
  Wheat: Wheat,
  Cherry: Cherry,
  Drumstick: Drumstick,
  Vegan: Vegan,
  LeafyGreen: LeafyGreen,
};

interface DietButtonProps {
  diet: Diet
}

const DietButton: FC<DietButtonProps> = ({diet}) => {
  const IconComponent = iconMap[diet.icon];

  const { pending } = useFormStatus();
  
  return (

    <button
      className={`w-full flex gap-4 p-4 items-center`}
      type="submit"
      disabled={pending}
    >
      { pending ? <Loader2 className='animate-spin sm:min-w-10 sm:min-h-10 min-w-8 min-h-8' /> : 
        <IconComponent className='sm:min-w-10 sm:min-h-10 min-w-8 min-h-8' /> 
      }
      
      <p className='flex flex-col gap-1'>
        <span className='self-start font-bold text-sm sm:text-base'>{diet.name}</span>
        <span className='text-xs sm:text-sm md:text-base'>Excludes: {diet.exclusion}</span>
      </p>
    </button>
  )
}

export default DietButton
