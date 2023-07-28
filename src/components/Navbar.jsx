import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserAuth } from "../context/AuthContext"
import '../App.css'

export const Navbar = () => {
  const { user, signOut, isLoading } = UserAuth()
  const navigate = useNavigate()
  console.log(user)
  function handleSignOut() {
    signOut()
    navigate('/')
  }
  if (isLoading) return <h1>loading...</h1>
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
        </div>
        <div>
          {
            user ? <Link to={'/'} className='sign-out' onClick={handleSignOut}>Sign Out</Link> :
              <Link to={'login'} className='sign-out'>Login</Link>
          }
        </div>
      </nav>
      <Outlet />
    </>
  )
}
