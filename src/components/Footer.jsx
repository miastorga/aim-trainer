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
            <a href="https://www.iubenda.com/privacy-policy/93074037" style={{ color: 'white' }} title="Privacy Policy ">Privacy Policy</a>
          </div>
        </>
      )}
    </div>
  )
}
