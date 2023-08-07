/* eslint-disable react/prop-types */
import target from '../assets/target.svg'
import shot from '../assets/shot.mp3'
import '../App.css'
import { GameContext } from '../context/GameStateContext'
import { useContext } from 'react'
export const Diana = ({ isMuted }) => {

  const { handleDianaClick, buttonPosition, handleAverageClick } = useContext(GameContext)

  function handleDianaSound() {
    isMuted ? new Audio(shot).mute : new Audio(shot).play()
  }

  return (
    <img src={target} alt="diana" className='diana-svg ' style={{
      top: `${buttonPosition.top}px`,
      left: `${buttonPosition.left}px`,
    }} onClick={() => {
      handleDianaClick()
      handleAverageClick()
      handleDianaSound()
    }} draggable="false" onMouseDown={() => false} />
  )
}
