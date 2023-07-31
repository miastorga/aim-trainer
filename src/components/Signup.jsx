import { UserAuth } from "../context/AuthContext"
import { useRef, useState } from 'react'
import reactLogo from '../assets/react.svg'
import supabaseLogo from '../assets/supabaselogo.png'
import viteLogo from '../assets/vite.svg'
import '../App.css'

export const SignUp = () => {
  const { signUp } = UserAuth()
  const emailRef = useRef('')
  const passRef = useRef('')
  const [isSignUp, setIsSignUp] = useState(false)

  async function handlerSubmit(e) {
    e.preventDefault()
    const userData = { email: emailRef.current?.value, pass: passRef.current.value }
    const { data, error } = await signUp(userData)
    console.log(data)
    if (data.user != null) {
      setIsSignUp(true)
      return // Algun tipo de mensaje diciendo que revise su correo
    }
    console.log(error)
  }

  return (
    <div className="login-container" >
      <div className="login">
        <div>
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
          <img src={supabaseLogo} className="logo supabase" alt="Supabase logo" />
        </div>
        <h1 style={{ color: 'black', fontWeight: 'bolder' }}>Vite + React + Supabase</h1>
        <form action="" onSubmit={handlerSubmit} className="login-form">
          <input type="text" ref={emailRef} name='email' placeholder='example@gmail.com' />
          <input type="password" name='pass' ref={passRef} placeholder='**********' />
          <button type='submit' className="btn">Accept</button>
          {isSignUp && <p style={{ color: 'green', width: '400px', marginTop: '10px' }}>We&apos;ve sent a verification link to your email. Please click on the link to activate your account.</p>}
        </form>
      </div>
    </div>
  )
}
