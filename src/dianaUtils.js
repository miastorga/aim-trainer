// Funcion encargada de mover de forma aleatoria la diana al hacerle click
export function handleDianaMovement(dianaContainerRef, setButtonPosition) {
  const containerRect = dianaContainerRef.current.getBoundingClientRect()

  const maxX = containerRect.width - 100 // 100 es el ancho del botón
  const maxY = containerRect.height - 100 // 100 es el ancho del botón

  const newX = Math.floor(Math.random() * maxX)
  const newY = Math.floor(Math.random() * maxY)

  const newButtonPosition = {
    top: newY,
    left: newX,
  }
  setButtonPosition(newButtonPosition)
}
