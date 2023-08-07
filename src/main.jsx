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
        element: <ProtectedRoute> <Login /> </ProtectedRoute>,
        errorElement: <h1>error</h1>,
      },
      {
        path: 'signup',
        element: <ProtectedRoute><SignUp /></ProtectedRoute>,
        errorElement: <h1>error</h1>,
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
