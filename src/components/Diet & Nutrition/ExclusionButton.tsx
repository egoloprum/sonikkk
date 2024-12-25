import { FC } from 'react'
import { useFormStatus } from 'react-dom';

interface ExclusionButtonProps {
  exclusion: string
}

const ExclusionButton: FC<ExclusionButtonProps> = ({exclusion}) => {
  const { pending } = useFormStatus();

  return (
    <button className='w-full p-2 px-4 items-center' type='submit' disabled={pending}>
      {exclusion}
    </button>
  )
}

export default ExclusionButton
