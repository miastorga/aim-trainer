import { Diana } from './components/Diana'
import { Terminado } from './components/Terminado'
import { Footer } from './components/Footer'
import { Volumen, VolumenMuted } from './components/Icons'
import './App.css'
import { useContext } from 'react'
import { GameContext } from './context/GameStateContext'

function App() {
  const { gameState, GAME_STATE, dianaContainerRef, remaining, isMuted, setIsMuted } = useContext(GameContext)

  const isGameFinished = remaining === 0
  const showRemaining = gameState === GAME_STATE.inProgress && !isGameFinished

  return (
    <>
      <main>
        <div className="main-content">
          <div className='title'>
            {gameState === GAME_STATE.notStarted && <h1>Aim Trainer</h1>}
          </div>
          <div className='header'>
            {showRemaining && <h2 style={{ color: 'white' }}>Remaining: {remaining}</h2>}
          </div>
          <div className='diana-container' ref={dianaContainerRef}>
            {remaining > 0 ? <Diana isMuted={isMuted} /> : <Terminado />}
          </div>
          <Footer />
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
    </>
  )
}

export default App
