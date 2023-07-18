import { useState } from 'react'
import { Diana } from './components/Diana'
import { useRef, useEffect } from 'react'
import { handleDianaMovement } from './dianaUtils'
import { Terminado } from './components/Terminado'
import { Footer } from './components/Footer'
import { Volumen } from './components/Volumen'
import { VolumenMuted } from './components/VolumenMuted'
import { AuthContextProvider } from './context/AuthContext'
import './App.css'
import { Login } from './components/Login'

export const GameState = {
  notStarted: 'notStarted',
  inProgress: 'inProgress',
  finished: 'finished'
}

function App() {
  const TOTAL_REMAINING = 20
  const dianaContainerRef = useRef()
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '50%' })
  const [remaining, setRemaining] = useState(TOTAL_REMAINING) // Estado para rastrear los click faltantes
  const [gameState, setGameState] = useState(GameState.notStarted) // Estado para mostrar las etapas del juego
  const [isFirstClick, setIsFirstClick] = useState(true) // Estado para rastrear el primer click
  const [isMuted, setIsMuted] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [clickTimes, setClickTimes] = useState([])
  const [averageTime, setAverageTime] = useState(0)

  useEffect(() => {
    if (clickTimes.length > 1) {
      const sum = clickTimes.reduce((a, b) => a + b, 0)
      const average = sum / clickTimes.length
      setAverageTime(average.toFixed(2))
    }
  }, [clickTimes])

  function handleAverageClick() {
    const currentTime = new Date().getTime()
    if (startTime) {
      const deltaTime = currentTime - startTime
      setClickTimes([...clickTimes, deltaTime])
    }
    setStartTime(currentTime)
  }

  function handleDianaClick() {
    if (isFirstClick) {
      setIsFirstClick(false)
      handleDianaMovement(dianaContainerRef, setButtonPosition)
      setGameState(GameState.inProgress)
    } else {
      handleDianaMovement(dianaContainerRef, setButtonPosition)
      setRemaining((prevRemaining) => prevRemaining - 1)
    }
    if (remaining === 1) setGameState(GameState.finished)
  }

  function handleGameRestart() {
    setGameState(GameState.notStarted)
    setRemaining(TOTAL_REMAINING)
    setIsFirstClick(true)
    setButtonPosition({ top: '50%', left: '50%' })
    setAverageTime(0)
    setStartTime(0)
    setClickTimes([])
  }


  const isGameFinished = remaining === 0
  const showRemaining = gameState === GameState.inProgress && !isGameFinished

  return (
    <AuthContextProvider>
      <nav>
        <h1>Human Benchmark</h1>
      </nav>
      <main>
        <Login />
        <div className="main-content">
          <div className='title'>
            {gameState === GameState.notStarted && <h1>Aim Trainer</h1>}
          </div>
          <div className='header'>
            {showRemaining && <h2>Remaining: {remaining}</h2>}
          </div>
          <div className='diana-container' ref={dianaContainerRef}>
            {remaining > 0 && <Diana handleDianaClick={handleDianaClick} buttonPosition={buttonPosition} handleAverageClick={handleAverageClick} isMuted={isMuted} />}
            {gameState === GameState.finished && <Terminado onGameRestart={handleGameRestart} averageTime={averageTime} />}
          </div>
          <Footer gameState={gameState} />
        </div>
        <div className='show-on-mobile'>
          <h1>This test is intended to be taken on a desktop or laptop. (Or make your browser window larger)</h1>
        </div>
        <div>
          <div onClick={() => setIsMuted(!isMuted)}>
            {
              isMuted ? <VolumenMuted /> : <Volumen />
            }
          </div>
        </div>
      </main>
    </AuthContextProvider>
  )
}

export default App
