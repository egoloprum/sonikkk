import { Loader2, ThumbsUp } from 'lucide-react';
import { FC } from 'react'
import { useFormStatus } from 'react-dom';

interface RecipeLikeButtonProps {
  likedValue: boolean
}

const RecipeLikeButton: FC<RecipeLikeButtonProps> = ({likedValue}) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`border-2 p-2.5 rounded-full cursor-pointer dark:hover:bg-black_hover 
      hover:bg-white_hover dark:border-black_border ${likedValue ? 'dark:bg-black_hover bg-white_hover' : ''}`}
      type="submit"
      disabled={pending}
    >
      { pending ? <Loader2 className='animate-spin w-5 h-5' /> : 
        <ThumbsUp className='w-5 h-5' /> 
      }
    </button>
  )
}

export default RecipeLikeButton
