/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/supabase.config"
import { redirect } from "react-router-dom"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([])

  async function singInWithGoogle() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    return data
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user.user_metadata)
      console.log("existe una session ", session?.user.user_metadata)
      redirect('/')
    })
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ singInWithGoogle, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}