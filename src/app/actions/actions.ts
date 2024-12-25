"use server"

import { revalidatePath } from "next/cache";
import { updatePrimaryDiet } from "../helpers/dietHelper";
import { updateExclusion } from "../helpers/exclusionHelper";

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
  }
}

export const submitExclusionAction = async (formData: FormData) => {
  const user_id = formData.get("exclusionUserId") as string
  const exclusion = formData.get("exclusionName") as string
  let exclusionList = (formData.get("exclusionList") as string).split(',')

  const exclusionExists = exclusionList.includes(exclusion)

  exclusionList = exclusionExists 
    ? exclusionList.filter(item => item !== exclusion) 
    : [...exclusionList, exclusion]


  const responseExclusion = await updateExclusion(user_id, exclusionList)

  console.log(`${exclusion} has been ${exclusionExists ? 'removed' : 'added'}.`);

  responseExclusion.status === 200 ? revalidatePath("/diet") : console.log("error")
}
