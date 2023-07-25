/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/supabase.config"
import { redirect } from "react-router-dom"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function singInWithGoogle() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    return data
  }

  async function signOut() {
    setIsLoading(true)
    await supabase.auth.signOut()
    setUser(null)
    setIsLoading(false)
  }

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      setUser(session?.user)
      setIsLoading(false)
    }
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user)
        setIsLoading(false)
        redirect('/')
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })
    setData()
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ singInWithGoogle, signOut, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}