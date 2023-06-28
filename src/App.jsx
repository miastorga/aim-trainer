import { useState } from 'react'
import { Diana } from './Diana'
import { useRef } from 'react'
import './App.css'

function App() {
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '50%' })
  const [remaining, setRemaining] = useState(10)
  const dianaContainerRef = useRef()

  function handleDianaMovement() {
    setRemaining(remaining => remaining - 1)
    const containerReact = dianaContainerRef.current.getBoundingClientRect()

    const maxX = containerReact.width - 100 // 100 es el ancho del boton
    const maxY = containerReact.height - 100 // 100 es el ancho del boton

    const newX = Math.floor(Math.random() * maxX)
    const newY = Math.floor(Math.random() * maxY)

    const newButtonPosition = {
      top: newY,
      left: newX,
    }
    setButtonPosition(newButtonPosition)
  }

  return (
    <>
      <nav>
        <h1>Human Benchmark</h1>
      </nav>
      <main>
        <div className="diana-container">
          <div>
            {
              remaining === 0 ? <p>se termino</p> : <h2>Remaining: {remaining}</h2>
            }
          </div>
          <div style={{ width: '100%', position: 'relative', height: '90%' }} ref={dianaContainerRef}>
            {
              remaining > 0 && (
                <Diana handleDianaMovement={handleDianaMovement} buttonPosition={buttonPosition} />
              )
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default App
