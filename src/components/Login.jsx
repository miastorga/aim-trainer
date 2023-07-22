import reactLogo from '../assets/react.svg'
import supabaseLogo from '../assets/supabaselogo.png'
import googleLogo from '../assets/logogoogle.png'
import viteLogo from '../assets/vite.svg'
import { UserAuth } from "../context/AuthContext"

export const Login = () => {
  const { singInWithGoogle } = UserAuth()
  return (
    <div className="login-container" >
      <div className="login">
        <div>
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
          <img src={supabaseLogo} className="logo supabase" alt="Supabase logo" />
        </div>
        <h1 style={{ color: 'black', fontWeight: 'bolder' }}>Vite + React + Supabase</h1>
        <img src={googleLogo} className="logo google" alt="Supabase logo" />
        <div className="card">
          <button onClick={singInWithGoogle} className='btn sign-out'>Continuar con Google</button>
        </div>
      </div>
    </div>
  )
}
