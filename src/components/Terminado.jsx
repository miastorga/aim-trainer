/* eslint-disable react/prop-types */
export const Terminado = ({ onGameRestart }) => {
  return (
    <div>
      <div>
        <h1>Tiempo promedio entre objetivo</h1>
        <p>500ms</p>
      </div>
      <div>
        <button onClick={() => onGameRestart()}>Try again</button>
      </div>
    </div>
  )
}
