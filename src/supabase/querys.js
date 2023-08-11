import { formatDate } from "../utils"
import { supabase } from "./supabase.config"

export async function getUserScore({ userId }) {
  const { data, error } = await supabase
    .from('Score')
    .select()
    .eq('user_id', userId)
  const formattedData = data.map(d => {
    return { ...d, date: formatDate({ date: d.date }) }
  })

  return { data: formattedData, error }
}

export async function insertUserScore({ average_time, user_id, date }) {
  const { data } = await supabase
    .from('Score')
    .insert({ average_time, user_id, date })
    .select()
  return data
}

export async function deleteScore(id) {
  try {
    await supabase.from("Score").delete().eq("id", id)
  } catch (error) {
    console.log("error", error)
  }
}