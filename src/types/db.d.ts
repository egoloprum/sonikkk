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

