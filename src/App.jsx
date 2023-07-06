import { useState } from 'react'
import { Diana } from './components/Diana'
import { useRef } from 'react'
import { handleDianaMovement } from './dianaUtils'
import { Terminado } from './components/Terminado'
import './App.css'

function App() {
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '50%' })
  const [startGame, setStartGame] = useState(true) // Estado para mostrar datos de inicio
  const [remaining, setRemaining] = useState(3) // Estado para rastrear los click faltantes
  const [firstClick, setFirstClick] = useState(true) // Estado para rastrear el primer clic
  const dianaContainerRef = useRef()

  function handleDianaClick() {
    if (firstClick) {
      setFirstClick(false)
      handleDianaMovement(dianaContainerRef, setButtonPosition)
    } else {
      handleDianaMovement(dianaContainerRef, setButtonPosition)
      setRemaining((prevRemaining) => prevRemaining - 1)
    }
    if (startGame) setStartGame(false)
  }

  const isGameFinished = remaining === 0

  return (
    <>
      <nav>
        <h1>Human Benchmark</h1>
      </nav>
      <main>
        <div className="diana-container">
          {startGame && <h1>Aim trainer</h1>}
          <div className='header'>
            {
              !startGame && !isGameFinished && (<h2>Remaining: {remaining}</h2>)
            }
          </div>
          <div className='main-content' ref={dianaContainerRef}>
            {remaining > 0 && (
              <Diana handleDianaClick={handleDianaClick} buttonPosition={buttonPosition} />
            )}
            {isGameFinished && <Terminado setStartGame={setStartGame} />}
          </div>
          {startGame && <p>Hit 30 targets as quickly as you can. Clic the target above to begin</p>}
        </div>
      </main>
    </>
  )
}

export default App
