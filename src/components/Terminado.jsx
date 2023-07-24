/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import '../App.css'
import target from '../assets/target.svg'
import { UserAuth } from '../context/AuthContext'

export const Terminado = ({ onGameRestart, averageTime }) => {
  const { user } = UserAuth()
  const navigate = useNavigate()

  function handleSaveScore() {
    if (!user) {
      navigate('login')
    }
  }
  return (
    <div className='terminado-container'>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={target} alt="diana" className='diana-terminado' />
        <h1 style={{ fontSize: '1.5rem' }}>Average time per target</h1>
        <p style={{ fontSize: '5rem', fontWeight: 'bold', marginBottom: '2rem' }}>{averageTime}ms</p>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button className='btn' onClick={handleSaveScore}>Save score</button>
        <button onClick={() => onGameRestart()} className='btn'>Try again</button>
      </div>
    </div >
  )
}
