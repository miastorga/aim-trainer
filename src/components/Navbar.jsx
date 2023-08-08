/* eslint-disable react/prop-types */
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserAuth } from "../context/AuthContext"
import '../App.css'

export const Navbar = () => {
  const { user, signOut } = UserAuth()
  const navigate = useNavigate()
  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <>
      <nav>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to={'/'} className='nav'>Aim Trainer</Link >
          {user && <Link to={'dashboard'} className='nav'> Dashboard</Link>}
        </div>
        <div>
          {
            user ? <Link to={'/'} className='sign-out' onClick={handleSignOut}>Sign Out</Link> :
              <Link to={'login'} className='sign-out'>Login</Link>
          }
        </div>
      </nav >
      <Outlet />
    </>
  )
}
