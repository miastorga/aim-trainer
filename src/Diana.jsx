/* eslint-disable react/prop-types */
import diana from './assets/diana .svg'
import './App.css'
export const Diana = ({ handleDianaMovement, buttonPosition }) => {

  return (
    <div>
      <img src={diana} alt="" className='diana-svg' style={{
        top: `${buttonPosition.top}px`,
        left: `${buttonPosition.left}px`,
        userSelect: 'none'
      }} onClick={handleDianaMovement} draggable="false" onMouseDown="return false" />
    </div>
  )
}
