import { formatDate } from "../utils"
import { supabase } from "./supabase.config"

function orderByDateAndFavorite(data) {
  return data.sort((a, b) => {
    if (a.is_favorite && !b.is_favorite) return -1
    if (!a.is_favorite && b.is_favorite) return 1

    return new Date(b.date) - new Date(a.date)
  })
}

export async function getUserScore({ userId }) {
  const { data, error } = await supabase
    .from('Score')
    .select()
    .eq('user_id', userId)
  const formattedData = data.map(d => {
    return { ...d, date: formatDate({ date: d.date }) }
  })
  const orderByDateandFavorites = orderByDateAndFavorite(formattedData)// <--- crear funcion en utils?
  return { data: orderByDateandFavorites, error }
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

async function updateFavoriteScore(id, newFavorite) {
  const { error } = await supabase
    .from('Score')
    .update({ is_favorite: newFavorite })
    .eq('id', id)
    .select()
  if (error) throw new Error(error)
}

// Toma el valor de la columna is_favorite y le da vuelta al bool
export async function getFavoriteScore(id) {
  const { data, error } = await supabase
    .from('Score')
    .select('is_favorite')
    .eq('id', id)
  const newFavorite = !data[0].is_favorite
  await updateFavoriteScore(id, newFavorite)
  return { data: newFavorite, error }
}