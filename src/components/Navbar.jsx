import { Link, Outlet } from 'react-router-dom'
import { UserAuth } from "../context/AuthContext"
import '../App.css'

export const Navbar = () => {
  const { user, signOut, isLoading } = UserAuth()
  console.log(isLoading)
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
            user ? <h1 style={{ fontSize: '20px' }}>{user?.user_metadata?.name}</h1> : null
          }
          {
            user ? <img src={user?.user_metadata?.avatar_url} alt="" style={{ width: '50px', borderRadius: '50%' }} /> : null
          }
        </div>
        <div>
          {
            isLoading ?
              <h1 className='sign-out'>Loading...</h1> :
              (
                user ?
                  <a onClick={signOut} style={{ cursor: 'pointer' }} className='sign-out'>Sign Out</a> :
                  <Link to={'login'} className='sign-out'>Login</Link>
              )
          }
        </div>
      </nav>
      <Outlet />
    </>
  )
}
