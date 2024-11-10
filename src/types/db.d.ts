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
