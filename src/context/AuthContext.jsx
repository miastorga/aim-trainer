/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/supabase.config"
import { redirect } from "react-router-dom"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function signUp({ email, pass }) {
    setIsLoading(true)
    console.log(email, pass)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pass,
      options: {
        data: {
          email
        }
      }
    })

    console.log(data)
    console.log(error.message)
    setIsLoading(false)
    return { data, error: error.message }
  }

  async function signIn({ email, pass }) {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    })
    console.log(error.message)
    setIsLoading(false)
    return { data, error: error.message }
  }

  async function signOut() {
    setIsLoading(true)
    const { error } = await supabase.auth.signOut()
    setIsLoading(false)
    if (error) return error
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
        console.log(session?.user)
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
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}