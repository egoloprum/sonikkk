interface User {
  name: string 
  email: string
  image: string 
  id: string
}

interface likedMeal {
  user: User
  meal: Meal
  liked_at: Date
  id: string
}

interface Exclusion {
  user_id: string 
  list: string[]
}

interface PrimaryDiet {
  user_id: string 
  diet_type: string
}

interface NutritionTarget {
  user_id: string 
  id: string
  title: string
  calories: number 
  carbs: number 
  fats: number 
  protein: number 
  fiber: number 
}

interface Recipe {
  recipe_id: number
  food_name: string
  prep_time: number
  cook_time: number 
  images: {
    image: string
    thumbnail: string
  }
  
  is_main_dish: boolean
  is_breakfast: boolean
  is_lunch: boolean
  is_dinner: boolean
  is_dessert: boolean
  is_snack: boolean
  tag_cloud: string

  nutritions: object
  directions: string[]
  ingredients: object[]

  is_custom: boolean
}
