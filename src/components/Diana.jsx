/* eslint-disable react/prop-types */
import diana from '../assets/diana .svg'
import '../App.css'
export const Diana = ({ handleDianaClick, buttonPosition }) => {

  return (
    <img src={diana} alt="" className='diana-svg' style={{
      top: `${buttonPosition.top}px`,
      left: `${buttonPosition.left}px`,
    }} onClick={handleDianaClick} draggable="false" onMouseDown={() => false} />
  )
}
