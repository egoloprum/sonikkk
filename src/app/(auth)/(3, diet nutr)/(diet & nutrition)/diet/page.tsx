import { createPrimaryDiet, getPrimaryDiet } from "@/app/helpers/dietHelper"
import PageNavbar from "@/components/UI/PageNavbar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { notFound } from "next/navigation"
import DietForm from "@/components/Diet & Nutrition/DietForm"

const defaultDiets = [
  {
    name: "Anything",
    exclusion: "Nothing",
    icon: "Sandwich",
    excludeList: []
  },
  {
    name: "Keto",
    exclusion: "Legumes, Starchy Vegetables, Grains",
    icon: "Wheat",
    excludeList: ['Beans', 'Lentils', 'Peas', 'Potato', 'Yam', 'Corn', 'Rice', 'Oats', 'Wheat', 'Barley', 'Couscous', 'Quinoa']
  },
  {
    name: "Mediterranean",
    exclusion: "Red Meat, Starchy Vegetables, Fruit juice",
    icon: "Cherry",
    excludeList: ['Beef', 'Pork', 'Lamb', 'Veal', 'Potato', 'Yam', 'Corn', 'Fruit juice']
  },
  {
    name: "Paleo",
    exclusion: "Dairy, Grains, Legumes, Soy, Starchy Vegetables",
    icon: "Drumstick",
    excludeList: ['Milk', 'Cream', 'Cheese', 'Yogurt', 'Cottage Cheese', 'Rice', 'Oats', 'Wheat', 'Barley', 'Couscous', 'Quinoa',
      'Beans', 'Lentils', 'Peas', 'Soy', 'Tofu', 'Potato', 'Yam'
    ]
  },
  {
    name: "Vegan",
    exclusion: "Red Meat, Poultry, Shellfish, Fish, Dairy, Eggs, Mayo, Honey",
    icon: "Vegan",
    excludeList: ['Beef', 'Pork', 'Lamb', 'Veal', 'Chicken', 'Turkey', 'Shellfish', 'Fish', 'Salmon', 'Tuna', 'Tilapia',
      'Milk', 'Cream', 'Cheese', 'Yogurt', 'Cottage Cheese', 'Eggs', 'Mayo', 'Honey'
    ]
  },
  {
    name: "Vegetarian",
    exclusion: "Red Meat, Poultry, Shellfish",
    icon: "LeafyGreen",
    excludeList: ['Beef', 'Pork', 'Lamb', 'Veal', 'Chicken', 'Turkey', 'Shellfish']
  },
] 

const page = async ({}) => {
  const session = await getServerSession(authOptions)

  if (!session) {notFound()}

  const user_id = session.user.id
  const primaryDiet = await getPrimaryDiet(user_id) as PrimaryDiet

  if (!primaryDiet) { await createPrimaryDiet(user_id) }

  return (
    <>
      <PageNavbar pageName="Primary Diet" />
      <div className="py-16 px-6 md:px-8 lg:px-10 flex justify-center">
        <div className="py-4 flex flex-col gap-4 w-full max-w-[800px]">
          <p className="text-sm sm:text-base">
            <span>
              We will base your meals off this main main diet type. 
              Choose Anything to customize your own unique diet from 
              scratch and set specific exclusions from the
            </span>
            <Link href='/exclusion' className="underline underline-offset-4 ml-2">Exclusions menu screen.</Link>
          </p>

          <div className="flex flex-col gap-4">
            {defaultDiets.map((diet, index) => {
              
              return (
                <DietForm diet={diet} key={index} primaryDiet={primaryDiet} user_id={user_id} />
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default page
