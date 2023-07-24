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
    errorElement: <h1>error</h1>,
    children: [
      {
        path: '/',
        element: <App />,
        errorElement: <h1>error</h1>
      },
      {
        path: 'login',
        element: <Login />,
        errorElement: <h1>error</h1>,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)
