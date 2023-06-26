import { useState } from 'react'
import './App.css'
import { Diana } from './Diana'
import { useRef } from 'react'
import { useEffect } from 'react'

function App() {
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '50%' })
  const [remaining, setRemaining] = useState(30)

  const dianaContainerRef = useRef()

  function handleDianaMovement() {
    setRemaining(remaining => remaining - 1)

    const containerReact = dianaContainerRef.current.getBoundingClientRect()
    console.log(containerReact)

    const maxX = containerReact.width - 100 // <---- ancho del boton
    const maxY = containerReact.height - 100 // <---- ancho del boton

    const newX = Math.floor(Math.random() * maxX)
    const newY = Math.floor(Math.random() * maxY)

    const newButtonPosition = {
      top: newY,
      left: newX,
    }
    console.log(newButtonPosition)
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
            <h2>Remaining: {remaining}</h2>
          </div>
          <div style={{ width: '100%', position: 'relative', height: '90%' }} ref={dianaContainerRef}>
            <Diana handleDianaMovement={handleDianaMovement} buttonPosition={buttonPosition} />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
