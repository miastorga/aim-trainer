
import { Link } from "react-router-dom"
import reactLogo from '../assets/react.svg'
import supabaseLogo from '../assets/supabaselogo.png'
import viteLogo from '../assets/vite.svg'
import { UserAuth } from "../context/AuthContext"
import { useEffect, useRef, useState } from 'react'
import '../App.css'

export const Login = () => {
  const { signIn } = UserAuth()
  const emailRef = useRef('')
  const passRef = useRef('')
  const [userData, setUserData] = useState({ email: '', pass: '' })
  const [errorMsg, setErrorMsg] = useState('')

  function handleOnChange(e) {
    const updatedUserData = ({
      ...userData,
      [e.target.name]: e.target.value,
    })

    setUserData(updatedUserData)
    console.log(userData)

    if (updatedUserData.email === '') {
      setErrorMsg('Email is empty')
      return
    }
    setErrorMsg(null)
  }


  async function handlerSubmit(e) {
    e.preventDefault()
    const dataUser = { email: emailRef.current?.value, pass: passRef.current.value }
    const { data, error } = await signIn(dataUser)
    console.log(data)
    if (error) {
      const l = 'errrrroe'
      setErrorMsg(l)
      return
    }
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
          <input type="text" onChange={handleOnChange} name='email' placeholder='example@gmail.com' />
          <input type="password" name='pass' onChange={handleOnChange} placeholder='**********' />
          <button type='submit'>Accept</button>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <p className="go-to-signup">Dont have an account?
            <Link to={'/signup'}> Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
