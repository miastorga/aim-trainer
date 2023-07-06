/* eslint-disable react/prop-types */
export const Terminado = ({ setStartGame }) => {
  return (
    <div>
      <div>
        <h1>Tiempo promedio entre objetivo</h1>
        <p>500ms</p>
      </div>
      <div>
        <button onClick={() => setStartGame(true)}>Try again</button>
      </div>
    </div>
  )
}
