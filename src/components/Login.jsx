
import { Link, useNavigate } from "react-router-dom"
import reactLogo from '../assets/react.svg'
import supabaseLogo from '../assets/supabaselogo.png'
import viteLogo from '../assets/vite.svg'
import { UserAuth } from "../context/AuthContext"
import { useRef, useState } from 'react'
import '../App.css'

export const Login = () => {
  const { signIn } = UserAuth()
  const emailRef = useRef('')
  const passRef = useRef('')
  const [errorMsg, setErrorMsg] = useState(null)
  const navigate = useNavigate()

  async function handlerSubmit(e) {
    e.preventDefault()
    const dataUser = { email: emailRef.current.value, pass: passRef.current.value }
    const { error } = await signIn(dataUser)
    if (error) {
      setErrorMsg(error)
      return
    }
    setErrorMsg(null)
    navigate('/')
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
          <input type="text" name='email' ref={emailRef} placeholder='example@gmail.com' />
          <input type="password" name='pass' ref={passRef} placeholder='**********' />
          <button type='submit' className="btn">Accept</button>
          {errorMsg && <p className="error-msg" style={{ margin: '10px 0px' }}>{errorMsg}</p>}
        </form>
        <p className="go-to-signup" >Dont have an account?
          <Link to={'/signup'}> Sign Up</Link>
        </p>
      </div>
      <div className='show-on-mobile'>
        <h1>This test is intended to be taken on a desktop or laptop. (Or make your browser window larger)</h1>
      </div>
    </div>
  )
}
