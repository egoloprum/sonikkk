"use server"

import { revalidatePath } from "next/cache";
import { updatePrimaryDiet } from "../helpers/dietHelper";
import { updateExclusion } from "../helpers/exclusionHelper";

export const submitDietAction = async (formData: FormData) => {
  const user_id = formData.get("exclusionUserId") as string
  const exclusionName = formData.get("exclusionName") as string
  const exclusion = formData.get("exclusionList") as string
  const exclusionList = exclusion.split(',')

  const responseDiet = await updatePrimaryDiet(user_id, exclusionName)
  const responseExclusion = await updateExclusion(user_id, exclusionList)

  if (responseDiet.status === 200 && responseExclusion.status === 200) {
    revalidatePath("/diet")
  }
  else {
    console.log("error")
  }
}
