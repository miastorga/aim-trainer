/* eslint-disable react/prop-types */
import diana from '../assets/diana .svg'
import '../App.css'
export const Diana = ({ handleDianaClick, buttonPosition, handleAverageClick }) => {

  return (
    <img src={diana} alt="diana" className='diana-svg' style={{
      top: `${buttonPosition.top}px`,
      left: `${buttonPosition.left}px`,
    }} onClick={() => {
      handleDianaClick()
      handleAverageClick()
    }} draggable="false" onMouseDown={() => false} />
  )
}
