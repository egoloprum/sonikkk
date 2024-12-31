import { Loader2, Star } from 'lucide-react';
import { FC } from 'react'
import { useFormStatus } from 'react-dom';

interface RecipeSaveButtonProps {
  savedValue: boolean
}

const RecipeSaveButton: FC<RecipeSaveButtonProps> = ({savedValue}) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`border-2 p-2.5 rounded-full cursor-pointer dark:hover:bg-black_hover 
      hover:bg-white_hover dark:border-black_border ${savedValue ? 'dark:bg-black_hover bg-white_hover' : ''}`}
      type="submit"
      disabled={pending}
    >
      { pending ? <Loader2 className='animate-spin w-5 h-5' /> : 
        <Star className='w-5 h-5' /> 
      }
    </button>
  )
}

export default RecipeSaveButton
