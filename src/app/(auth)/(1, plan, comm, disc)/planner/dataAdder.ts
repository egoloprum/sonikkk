import { supabase } from "@/lib/supabase";

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const MAX_RETRIES = 5
const WAIT_TIME = 3000

export const dataFetcher = async (recipe_id: number) => {
  const recipe = {
    recipe_id: 0,
    food_name: "",
    prep_time: 0,
    cook_time: 0,
    images: {}, 
    is_main_dish: false,
    is_breakfast: false,
    is_lunch: false,
    is_dinner: false,
    is_dessert: false,
    is_snack: false,
    tag_cloud: "",
    nutritions: {}, 
    directions: [], 
    ingredients: [],
    is_custom: false
  } as Recipe;

  const payload = `https://www.eatthismuch.com/api/v1/recipe/${recipe_id}`;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(payload);

      if (response.status === 429) {
        console.warn(`Received 429 Too Many Requests. Attempt ${attempt + 1} of ${MAX_RETRIES}.`);
        
        await wait(WAIT_TIME * Math.pow(2, attempt)); 
        continue; 
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error fetching data: ${response.status} - ${errorText}`);
        return;
      }

      const response_data = await response.json();
      const data = response_data;

      console.log(`---fetching--- ${data.id} ---main_dish--- ${data.main_dish}`);

      if (data.main_dish && data.directions.length > 0 && data.ingredients.length > 0) {
        recipe.recipe_id = data.id;
        recipe.food_name = data.food_name;
        recipe.prep_time = data.prep_time;
        recipe.cook_time = data.cook_time;

        if ((data.images[0] && data.images[0].thumbnail) && 
            (data.images[0] && data.images[0].image)) {
          const images = {
            thumbnail: data.images[0].thumbnail,
            image: data.images[0].image
          };
          recipe.images = images;
        } else {
          recipe.images = {};
        }

        recipe.is_main_dish = data.main_dish;
        recipe.is_breakfast = data.is_breakfast;
        recipe.is_lunch = data.is_lunch;
        recipe.is_dinner = data.is_dinner;
        recipe.is_dessert = data.is_dessert;
        recipe.is_snack = data.is_snack;

        recipe.tag_cloud = data.tag_cloud;

        const nutritions = {
          calories: Math.floor(data.calories),
          carbs: Math.floor(data.carbs),
          fats: Math.floor(data.fats),
          protein: Math.floor(data.protein),
          fiber: Math.floor(data.fiber),
          sugar: Math.floor(data.sugar),
          cholesterol: Math.floor(data.cholesterol),
        };
        recipe.nutritions = nutritions;

        for (const dir of data.directions) {
          if (dir && dir.text) {
            recipe.directions.push(dir.text);
          }
        }

        for (const ingredient of data.ingredients) {
          const ingredient_data = ingredient.food;

          const ingred = {
            name: ingredient_data.food_name, 
            description: ingredient_data.description
          };
          recipe.ingredients.push(ingred);
        }

        const { error } = await supabase
          .from('recipe')
          .insert(recipe)
          .select();

        if (error) {
          console.log(error);
        } else {
          console.log(`---successful--- ${recipe.recipe_id}`);
        }
      }

      return; // Exit the function after a successful request

    } catch (error) {
      console.log(`---try catch error--- ${error}`);
      return;
    }
  }

  console.error(`Failed to fetch recipe ${recipe_id} after ${MAX_RETRIES} attempts.`);
};
