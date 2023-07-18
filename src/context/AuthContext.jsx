import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/supabase.config"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([])

  async function singInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) {
      throw new Error(error, " Error al iniciar sesion con google")
    }
    return data
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error, " Error al cerrar sesion con google")
    }
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("supabase session ", session)
      if (session == null) {
        console.log("No logeado, irse al login")
      } else {
        setUser(session.user)
        console.log("existe una session ", session.user)
      }
    })
    return () => {
      authListener.subscription
    }
  }, [])
  return (
    <AuthContext.Provider value={{ singInWithGoogle, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAth = () => {
  return useContext(AuthContext)
}