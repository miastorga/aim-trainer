/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import '../App.css'
import target from '../assets/target.svg'
import { UserAuth } from '../context/AuthContext'
import { getCurrentDate } from '../utils'
import { insertUserScore } from '../supabase/querys'
import { useContext } from 'react'
import { GameContext } from '../context/GameStateContext'

export const Terminado = () => {
  const { handleGameRestart, averageTime } = useContext(GameContext)
  const { user } = UserAuth()
  const navigate = useNavigate()
  const currentDate = getCurrentDate()

  async function handleSaveScore() {
    if (user) {
      await insertUserScore({ average_time: averageTime, user_id: user.id, date: currentDate })
      handleGameRestart()
      return
    }
    navigate('/login')
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
        <button onClick={() => handleGameRestart()} className='btn'>Try again</button>
      </div>
    </div >
  )
}
