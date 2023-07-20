import ReactDOM from "react-dom/client"
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import { Login } from "./components/Login.jsx"
import { AuthContextProvider } from './context/AuthContext'
import { Navbar } from "./components/Navbar.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)
