/* eslint-disable react/prop-types */
import '../App.css'
export const Terminado = ({ onGameRestart, averageTime }) => {
  return (
    <div>
      <div>
        <h1>Tiempo promedio por objetivo</h1>
        <p>{averageTime}ms</p>
      </div>
      <div >
        <button onClick={() => onGameRestart()} className='btn'>Try again</button>
      </div>
    </div>
  )
}
