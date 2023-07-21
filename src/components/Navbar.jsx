import { Link, Outlet } from 'react-router-dom'
import { UserAuth } from "../context/AuthContext"
import '../App.css'

export const Navbar = () => {
  const { user, signOut } = UserAuth()
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
            user ? <h1>{user.name}</h1> : null
          }
          {
            user ? <img src={user?.avatar_url} alt="" style={{ width: '50px', borderRadius: '50%' }} /> : null
          }
        </div>
        <div>
          {
            user ? <button onClick={signOut} className='btn sign-out'>Sign Out</button> :
              <Link to={'login'} className='btn sign-out'>Login</Link>
          }
        </div>
      </nav>
      <Outlet />
    </>
  )
}
