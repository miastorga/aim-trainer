// Funcion encargada de mover de forma aleatoria la diana
export function handleDianaMovement(dianaContainerRef, setButtonPosition) {
  const containerRect = dianaContainerRef.current.getBoundingClientRect()

  const maxX = containerRect.width - 100 // 100 es el ancho de la diana
  const maxY = containerRect.height - 100 // 100 es el ancho de la diana

  const newX = Math.floor(Math.random() * maxX)
  const newY = Math.floor(Math.random() * maxY)

  const newButtonPosition = {
    top: newY,
    left: newX,
  }
  setButtonPosition(newButtonPosition)
}

export function formatDate({ date }) { // 2023-08-04T01:13:58+00:00 -------> 2023-08-04T01:13:58
  const replace = date.replace('T', ' ')
  const newDate = replace.slice(0, -6)
  return newDate
}

export function getCurrentDate() { // <------- 2023-03-12 17:08:00+00
  let currentDateTime = new Date()

  let year = currentDateTime.getFullYear()
  let month = ("0" + (currentDateTime.getMonth() + 1)).slice(-2)

  let day = ("0" + currentDateTime.getDate()).slice(-2)

  let hours = ("0" + currentDateTime.getHours()).slice(-2)
  let minutes = ("0" + currentDateTime.getMinutes()).slice(-2)
  let seconds = ("0" + currentDateTime.getSeconds()).slice(-2)

  let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00`
  return formattedDateTime
}
