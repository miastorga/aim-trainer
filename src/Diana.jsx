/* eslint-disable react/prop-types */
import './App.css'
export const Diana = ({ handleDianaMovement, buttonPosition }) => {

  return (
    <button className='diana-btn' onClick={handleDianaMovement}
      style={{
        position: 'absolute',
        top: `${buttonPosition.top}px`,
        left: `${buttonPosition.left}px`,
      }}
    >Click</button>
  )
}
