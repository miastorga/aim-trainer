/* eslint-disable react/prop-types */
import { createContext, useState, useRef, useEffect } from 'react'
import { handleDianaMovement } from '../utils'

export const GameContext = createContext('')

export const GameStateContextProvider = ({ children }) => {

  const GAME_STATE = {
    notStarted: 'notStarted',
    inProgress: 'inProgress',
    finished: 'finished'
  }

  const TOTAL_REMAINING = 30

  const [gameState, setGameState] = useState(GAME_STATE.notStarted) // Estado para mostrar las etapas del juego
  const [startTime, setStartTime] = useState(0)
  const [clickTimes, setClickTimes] = useState([])
  const [averageTime, setAverageTime] = useState(0)
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '50%' })
  const [remaining, setRemaining] = useState(TOTAL_REMAINING) // Estado para rastrear los click faltantes
  const [isFirstClick, setIsFirstClick] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const dianaContainerRef = useRef()

  useEffect(() => {
    if (clickTimes.length > 1) {
      const sum = clickTimes.reduce((a, b) => a + b, 0)
      const average = sum / clickTimes.length
      setAverageTime(average.toFixed(2))
    }
  }, [clickTimes])

  function handleDianaClick() {
    if (isFirstClick) {
      setIsFirstClick(false)
      handleDianaMovement(dianaContainerRef, setButtonPosition)
      setGameState(GAME_STATE.inProgress)
    } else {
      handleDianaMovement(dianaContainerRef, setButtonPosition)
      setRemaining((prevRemaining) => prevRemaining - 1)
    }
    if (remaining === 1) setGameState(GAME_STATE.finished)
  }

  function handleAverageClick() {
    const currentTime = new Date().getTime()
    if (startTime) {
      const deltaTime = currentTime - startTime
      setClickTimes([...clickTimes, deltaTime])
    }
    setStartTime(currentTime)
  }

  function handleGameRestart() {
    setGameState(GAME_STATE.notStarted)
    setRemaining(TOTAL_REMAINING)
    setIsFirstClick(true)
    setButtonPosition({ top: '50%', left: '50%' })
    setAverageTime(0)
    setStartTime(0)
    setClickTimes([])
  }

  return (
    <GameContext.Provider value={{
      TOTAL_REMAINING, GAME_STATE, gameState, setGameState, dianaContainerRef, isMuted, remaining,
      handleGameRestart, handleAverageClick, handleDianaClick, buttonPosition, averageTime, setIsMuted
    }}>
      {children}
    </GameContext.Provider>
  )
}
