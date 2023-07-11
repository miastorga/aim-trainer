/* eslint-disable react/prop-types */
import '../App.css'
import target from '../assets/target.svg'

export const Terminado = ({ onGameRestart, averageTime }) => {
  return (
    <div className='terminado-container'>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={target} alt="diane" className='diana-terminado' />
        <h1 style={{ fontSize: '1.5rem' }}>Average time per target</h1>
        <p style={{ fontSize: '5rem', fontWeight: 'bold', marginBottom: '2rem' }}>{averageTime}ms</p>
      </div>
      <div >
        <button onClick={() => onGameRestart()} className='btn'>Try again</button>
      </div>
    </div >
  )
}