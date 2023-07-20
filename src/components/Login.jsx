import reactLogo from '../assets/react.svg'
import supabaseLogo from '../assets/supabaselogo.png'
import googleLogo from '../assets/logogoogle.png'
import { UserAth } from "../context/AuthContext"

export const Login = () => {
  const { singInWithGoogle, signOut } = UserAth()
  return (
    <div className="login-container" >
      <div className="login">
        <div>
          <img src={reactLogo} className="logo react" alt="React logo" />
          <img src={supabaseLogo} className="logo supabase" alt="Supabase logo" />
        </div>
        <img src={googleLogo} className="logo google" alt="Supabase logo" />
        <div className="card">
          <button onClick={singInWithGoogle}>Iniciar sesion con Google</button>
          {/* <button onClick={signOut}>singOut</button> */}
        </div>
      </div>
    </div>
  )
}
