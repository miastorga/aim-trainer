/* eslint-disable react/prop-types */
import { useContext } from 'react'
import '../App.css'
import { GameContext } from '../context/GameStateContext'

export const Footer = () => {
  const { gameState, GAME_STATE } = useContext(GameContext)
  return (
    <div className='footer'>
      {gameState === GAME_STATE.notStarted && (
        <>
          <div>
            <p>Hit 30 targets as quickly as you can</p>
            <p>Click the target above to begin</p>
          </div>
        </>
      )}
    </div>
  )
}
