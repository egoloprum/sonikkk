import { Clock } from "lucide-react"

const RecipeCard = ({}) => {
  return (
    <div className="flex flex-row md:flex-col gap-4 p-4 w-full max-w-[300px] rounded hover:dark:bg-black_hover hover:bg-white_hover">
      <div className="border-2 rounded p-16">
        <img src="" alt="" />
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="text-sm sm:text-base">
          <p className="underline">Name</p>
          <p>Description</p>
        </div>
        <div className="text-xs sm:text-sm md:text-base">
          <p>0 Calories</p>
          <p className="flex gap-2 items-center">
            <Clock className="w-4" />
            <span>Prep time</span>
          </p>
        </div>
      </div>

    </div>
  )
}

export default RecipeCard
