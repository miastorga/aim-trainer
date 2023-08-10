import ReactDOM from "react-dom/client"
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import { Navbar } from "./components/Navbar.jsx"
import { AuthContextProvider } from "./context/AuthContext.jsx"
import { Login } from "./components/Login.jsx"
import { SignUp } from "./components/Signup.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"
import { GameStateContextProvider } from "./context/GameStateContext.jsx"
import { TimeRecords } from "./components/TimeRecords.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <h2>Oops, something went wrong.</h2>,
    children: [
      {
        path: '/',
        element: <App />,
        errorElement: <h2>Oops, something went wrong.</h2>
      },
      {
        path: 'login',
        element: <ProtectedRoute> <Login /> </ProtectedRoute>,
        errorElement: <h2>Oops, something went wrong.</h2>,
      },
      {
        path: 'signup',
        element: <ProtectedRoute><SignUp /></ProtectedRoute>,
        errorElement: <h2>Oops, something went wrong.</h2>,
      }, {
        path: 'dashboard',
        element: <TimeRecords />,
        errorElement: <h2>Oops, something went wrong.</h2>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <GameStateContextProvider>
      <RouterProvider router={router} />
    </GameStateContextProvider>
  </AuthContextProvider>
)
