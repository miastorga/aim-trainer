import reactLogo from '../assets/react.svg'
import supabaseLogo from '../assets/supabaselogo.png'
import viteLogo from '../assets/vite.svg'
import { Login } from './Login'
import '../App.css'

export const AuthContainer = () => {
  return (
    <div className="login-container" >
      <div className="login">
        <div>
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
          <img src={supabaseLogo} className="logo supabase" alt="Supabase logo" />
        </div>
        <h1 style={{ color: 'black', fontWeight: 'bolder' }}>Vite + React + Supabase</h1>
        <Login />
      </div>
    </div>
  )
}
