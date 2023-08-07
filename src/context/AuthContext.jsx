/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/supabase.config"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function signUp({ email, pass }) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pass,
      options: {
        data: {
          email
        }
      }
    })
    setIsLoading(false)
    return { data, error: error?.message }
  }

  async function signIn({ email, pass }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    })
    setIsLoading(false)
    return { data, error: error?.message }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    setIsLoading(false)
    if (error) return error
  }

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      console.log(session?.user)
      if (error) throw error
      setUser(session?.user)
      setIsLoading(false)
    }
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          console.log('log in')
          setUser(session?.user)
          setIsLoading(false)
          break
        case 'SIGNED_OUT':
          console.log('sign out')
          setUser(null)
          setIsLoading(false)
          break
        case 'PASSWORD_RESET':
          // Lógica para cuando se resetea la contraseña
          break
        case 'USER_UPDATED':
          console.log('user update')
          break
        default:
          // Lógica por defecto
          break
      }
    })

    setData()

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut, setIsLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}