interface Nutrition {
  calories: number;
  carbohydrates: number; 
  fat: number;
  fiber: number;
  protein: number;
  sugar: number;
  updated_at: string;
}

interface Meal {
  name: string
  description: string
  thumbnail_url: string 
  nutrition: Nutrition

  sections: {
    components: {
      raw_text: string
    }[]
  }[]

  instructions: {
    display_text: string
  }[]

  prep_time_minutes?: number
  cook_time_minutes?: number

  meal_id: string
}
