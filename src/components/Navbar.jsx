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
        <div>
          <Link to={'/'} className='nav'>Aim Trainer</Link >
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {
            user ? <h1>{user.email}</h1> : null
          }
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
