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
