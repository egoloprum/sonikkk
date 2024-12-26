import { FC } from 'react'
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

interface ExclusionButtonProps {
  exclusion: string
}

const ExclusionButton: FC<ExclusionButtonProps> = ({exclusion}) => {
  const { pending } = useFormStatus();

  return (
    <button className='w-full p-2 px-4 items-center' type='submit' disabled={pending}>
      {pending ? (
        <Loader2 className='animate-spin w-5 h-5' />
      ) : (exclusion)}
    </button>
  )
}

export default ExclusionButton
