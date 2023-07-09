import { useState } from 'react'
import { Diana } from './components/Diana'
import { useRef, useEffect } from 'react'
import { handleDianaMovement } from './dianaUtils'
import { Terminado } from './components/Terminado'
import './App.css'

const GameState = {
  notStarted: 'notStarted',
  inProgress: 'inProgress',
  finished: 'finished'
}

function App() {
  const TOTAL_REMAINING = 2
  const dianaContainerRef = useRef()
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '50%' })
  const [remaining, setRemaining] = useState(TOTAL_REMAINING) // Estado para rastrear los click faltantes
  const [gameState, setGameState] = useState(GameState.notStarted) // Estado para mostrar las etapas del juego (pantalla de inicio, juego, pantalla final)
  const [isFirstClick, setIsFirstClick] = useState(true) // Estado para rastrear el primer click
  const [startTime, setStartTime] = useState(0)
  const [clickTimes, setClickTimes] = useState([])
  const [averageTime, setAverageTime] = useState(0)

  useEffect(() => {
    if (clickTimes.length > 1) {
      const sum = clickTimes.reduce((a, b) => a + b, 0)
      const average = sum / clickTimes.length
      setAverageTime(average.toFixed(2))
    } else {
      setAverageTime(0)
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
    <>
      <nav>
        <h1>Human Benchmark</h1>
      </nav>
      <main>
        <div className="main-content">
          <div className='title'>
            {gameState === GameState.notStarted && <h1>Aim Trainer</h1>}
          </div>
          <div className='header'>
            {showRemaining && <h2>Remaining: {remaining}</h2>}
          </div>
          <div className='diana-container' ref={dianaContainerRef}>
            {remaining > 0 && <Diana handleDianaClick={handleDianaClick} buttonPosition={buttonPosition} handleAverageClick={handleAverageClick} />}
            {gameState === GameState.finished && <Terminado onGameRestart={handleGameRestart} averageTime={averageTime} />}
          </div>
          <div className='footer'>
            {gameState === GameState.notStarted && (
              <>
                <p>Hit 30 targets as quickly as you can</p>
                <p>Click the target above to begin</p>
              </>
            )}
          </div>
        </div>
        <div className='show-on-mobile'>
          <h1>This test is intended to be taken on a desktop or laptop. (Or make your browser window larger)</h1>
        </div>
      </main>
    </>
  )
}

export default App
