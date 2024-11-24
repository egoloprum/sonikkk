import { Ban, Pin, Star, ThumbsUp } from 'lucide-react'

const RecipeButtons = ({}) => {
  return (
    <div className='py-2 sm:py-4 px-4 sm:px-8 md:px-12 flex gap-4 justify-between'>
      <div className='border-2 p-2.5 rounded-full dark:hover:bg-black_hover dark:border-black_border'>
        <Pin className='w-5 h-5' />
      </div>
      <div className='border-2 p-2.5 rounded-full dark:hover:bg-black_hover dark:border-black_border'>
        <Star className='w-5 h-5' />
      </div>
      <div className='border-2 p-2.5 rounded-full dark:hover:bg-black_hover dark:border-black_border'>
        <ThumbsUp className='w-5 h-5' />
      </div>
      <div className='border-2 p-2.5 rounded-full dark:hover:bg-black_hover dark:border-black_border'>
        <Ban className='w-5 h-5' />
      </div>
    </div>
  )
}

export default RecipeButtons