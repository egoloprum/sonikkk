interface Nutrition {
  calories?:       number
  carbohydrates?:  number 
  fat?:            number
  fiber?:          number
  protein?:        number
  sugar?:          number
  updated_at?:     string
  [key: string]: number | string | undefined;
}

interface Meal {
  name:           string
  description:    string
  thumbnail_url:  string
  keywords?:      string
  slug?:          string
  nutrition:      Nutrition

  tags?:          object[]
  topics?:        object[]

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
