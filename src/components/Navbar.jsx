import { Link, Outlet } from 'react-router-dom'
import '../App.css'

export const Navbar = () => {
  return (
    <>
      <nav>
        <Link to={'/'} className='nav'>Aim Trainer</Link >
        <Link to={'login'} className='nav'>Login</Link>
      </nav>
      <Outlet />
    </>
  )
}
