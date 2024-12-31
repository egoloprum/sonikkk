"use server"

import { revalidatePath } from "next/cache";
import { updatePrimaryDiet } from "../helpers/dietHelper";
import { updateExclusion } from "../helpers/exclusionHelper";
import { recipeLikeAdd, recipeLikeRemove, recipeSaveAdd, recipeSaveRemove } from "../helpers/recipeHelper";

export const submitDietAction = async (formData: FormData) => {
  const user_id = formData.get("dietUserId") as string
  const dietName = formData.get("dietName") as string
  const diet = formData.get("dietList") as string
  const dietList = diet.split(',')

  const responseDiet = await updatePrimaryDiet(user_id, dietName)
  const responseExclusion = await updateExclusion(user_id, dietList)

  if (responseDiet.status === 200 && responseExclusion.status === 200) {
    revalidatePath("/diet")
  }
  else {
    console.log("error")
    return
  }
}

export const submitExclusionAction = async (formData: FormData) => {
  const user_id = formData.get("exclusionUserId") as string;
  const exclusion = formData.get("exclusionName") as string;
  let exclusionList = (formData.get("exclusionList") as string).split(',');

  const exclusionExists = exclusionList.includes(exclusion);

  exclusionList = exclusionExists 
    ? exclusionList.filter(item => item !== exclusion) 
    : [...exclusionList, exclusion];

  const responseExclusion = await updateExclusion(user_id, exclusionList);

  if (responseExclusion.status === 200) {
    revalidatePath("/exclusion")
  } else {
    console.log("error")
    return
  }

  console.log(`${exclusion} has been ${exclusionExists ? 'removed' : 'added'}.`);
}

export const submitSavedAction = async (formData: FormData) => {
  const user_id = formData.get("savedUserId") as string
  const recipe_id = formData.get("savedRecipeId") as string
  const savedAlreadyStr = formData.get("savedAlready") as string

  const savedCondition = savedAlreadyStr === 'true' ? true : false
  let response: boolean

  if (savedCondition) {
    response = await recipeSaveRemove(recipe_id, user_id)
  }
  else {
    response = await recipeSaveAdd(recipe_id, user_id)
  }

  if (response) {
    revalidatePath(`/recipe/${recipe_id}`)
  }
  else {
    console.log("error")
    return
  }
}

export const submitLikedAction = async (formData: FormData) => {
  const user_id = formData.get("likedUserId") as string
  const recipe_id = formData.get("likedRecipeId") as string
  const likedAlreadyStr = formData.get("likedAlready") as string

  const likedCondition = likedAlreadyStr === 'true' ? true : false
  let response: boolean

  if (likedCondition) {
    response = await recipeLikeRemove(recipe_id, user_id)
  }
  else {
    response = await recipeLikeAdd(recipe_id, user_id)
  }

  if (response) {
    revalidatePath(`/recipe/${recipe_id}`)
  }
  else {
    console.log("error")
    return
  }
}
