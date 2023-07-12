/* eslint-disable react/prop-types */
import target from '../assets/target.svg'
import shot from '../assets/shot.mp3'
import '../App.css'
export const Diana = ({ handleDianaClick, buttonPosition, handleAverageClick, isMuted }) => {

  function handleDianaSound() {
    isMuted ? new Audio(shot).mute : new Audio(shot).play()
  }

  return (
    <img src={target} alt="diana" className='diana-svg ' style={{
      top: `${buttonPosition.top}px`,
      left: `${buttonPosition.left}px`,
      // transform: `translate(${buttonPosition.left}px, ${buttonPosition.top}px)`
    }} onClick={() => {
      handleDianaClick()
      handleAverageClick()
      handleDianaSound()
    }} draggable="false" onMouseDown={() => false} />
  )
}
