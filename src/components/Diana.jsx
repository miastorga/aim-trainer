/* eslint-disable react/prop-types */
import target from '../assets/target.svg'
import '../App.css'
export const Diana = ({ handleDianaClick, buttonPosition, handleAverageClick }) => {

  return (
    <img src={target} alt="diana" className='diana-svg' style={{
      top: `${buttonPosition.top}px`,
      left: `${buttonPosition.left}px`,
    }} onClick={() => {
      handleDianaClick()
      handleAverageClick()
    }} draggable="false" onMouseDown={() => false} />
  )
}
