import { getExclusion, getExclusionCount } from "@/app/helpers/exclusionHelper"
import ExclusionForm from "@/components/Diet & Nutrition/ExclusionForm"
import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const defaultExclusions = [
  {
    name: "Common Exclusions",
    list: [
      'Gluten', 'Peanuts', 'Eggs', 'Fish', 'Milk', 'Soy', 'Shellfish', 'Pork'
    ]
  },
  {
    name: "Dairy",
    list: ['Milk', 'Cream', 'Cheese', 'Yogurt', 'Cottage Cheese']
  },
  {
    name: "Eggs",
    list: ['Eggs']
  },
  {
    name: "Grains",
    list: ['Rice', 'Oats', 'Wheat', 'Barley', 'Couscous', 'Quinoa']
  },
  {
    name: "Soy",
    list: ['Soy', 'Tofu']
  },
  {
    name: "Red Meat",
    list: ['Beef', 'Pork', 'Lamb', 'Veal']
  },
  {
    name: "Poultry",
    list: ['Chicken', 'Turkey']
  },
  {
    name: "Fish",
    list: ['Fish', 'Salmon', 'Tuna', 'Tilapia']
  },
  {
    name: "Shellfish",
    list: ['Shellfish']
  },
  {
    name: "Mayo",
    list: ['Mayo']
  },
  {
    name: "Fats & Nuts",
    list: ['Avocado', 'Peanuts', 'Almonds', 'Walnuts', 'Pecans']
  },
  {
    name: "Legumes",
    list: ['Beans', 'Lentils', 'Peas']
  },
  {
    name: "Fruit",
    list: ['Apple', 'Banana', 'Grapes', 'Orange', 'Strawberries', 'Raspberries', 'Blueberries', 'Fruit juice']
  },
  {
    name: "Vegetables",
    list: ['Artichoke', 'Asparagus', 'Beets', 'Broccoli', 
      'Carrots', 'Sprouts', 'Celery', 'Peppers', 'Tomato', 'Eggplant'
    ] 
  },
  {
    name: "Starchy Vegetables",
    list: ['Potato', 'Yam', 'Corn']
  },
  {
    name: "Honey",
    list: ['Honey']
  },
]


const page = async ({}) => {
  const session = await getServerSession(authOptions)
  if (!session) {notFound()}

  const user_id = session.user.id
  const exclusion = await getExclusion(user_id)

  let exclusionCount = 0

  // if (exclusion) {
  //   exclusionCount = await getExclusionCount(exclusion.list)
  // }

  return (
    <>
      <PageNavbar pageName="Food Exclusions" />
      <div className="py-16 px-6 sm:px-8 md:px-10 lg:px-12 max-w-[800px]">
        <div className="py-4 flex flex-col gap-4">
          <p className="text-xs sm:text-sm md:text-base">
            Add exclusions to filter out recipes from the generator suggestions. Any recipes 
            that match their title or ingredients will not be included in your plans.
          </p>

          <div className='flex gap-4 flex-col'>
            <div className='flex flex-col gap-2'>
              <p className='font-bold text-base sm:text-lg md:text-xl'>Your exclusions</p>

              <div className='flex gap-2 flex-wrap'>
                {exclusion?.list.length ? (
                  exclusion.list.map((ex: string, index) => (
                    <p key={index} className='border border-gray_border dark:bg-black_hover
                      bg-white_hover rounded w-fit text-xs sm:text-sm p-2 px-4 select-none'>{ex}</p>
                  ))
                ) : (
                  <p className='text-xs sm:text-sm md:text-base'>empty</p>
                )}
              </div>
            </div>

            <div className='flex gap-2 flex-col'>
              <p className='font-bold text-base sm:text-lg md:text-xl'>Recipes Variety</p>
              <p className='text-xs sm:text-sm md:text-base'>You have excluded 
                <span className='font-bold ml-2'>13</span> % of the available recipes.
              </p>
            </div>
          </div><hr className=' border-gray_border' />

          <div className="flex gap-4 flex-col">
            <div className="flex flex-col gap-4">
              {defaultExclusions.map((defExclusionList, index1) => {
                return (
                  <div className='flex flex-col gap-2'>
                    <p className="font-bold text-base sm:text-lg md:text-xl">{defExclusionList.name}</p>

                    <div className="flex flex-wrap gap-2">
                      {defExclusionList.list.map((defExclusion, index2) => (
                        <ExclusionForm exclusion={defExclusion} key={`${index1}-${index2}`} 
                          exclusionList={exclusion?.list ?? null} user_id={user_id} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>




          {/* <ExclusionClient exclusion={exclusion} user_id={user_id} exclusionCount={exclusionCount} /> */}
        </div>
      </div>
    </>
  )
}

export default page
