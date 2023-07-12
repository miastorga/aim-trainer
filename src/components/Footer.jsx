/* eslint-disable react/prop-types */
import { GameState } from '../App'
import '../App.css'

export const Footer = ({ gameState }) => {
  return (
    <div className='footer'>
      {gameState === GameState.notStarted && (
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
