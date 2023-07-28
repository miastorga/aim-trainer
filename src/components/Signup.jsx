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
  const [errorMsg, setErrorMsg] = useState('')

  async function handlerSubmit(e) {
    e.preventDefault()
    const data = { email: emailRef.current?.value, pass: passRef.current.value }
    const signUpData = await signUp(data)
    if (signUpData.error) {
      const error = signUpData.error
      setErrorMsg(error)
    }
    console.log(signUpData)
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
        <form action="" onSubmit={handlerSubmit}>
          <input type="text" ref={emailRef} name='email' placeholder='example@gmail.com' />
          <input type="password" name='pass' ref={passRef} placeholder='**********' />
          {errorMsg && <p>{errorMsg}</p>}
          <button type='submit'>Accept</button>
        </form>
      </div>
    </div>
  )
}
