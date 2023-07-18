import { UserAth } from "../context/AuthContext"

export const Login = () => {
  const { singInWithGoogle, signOut } = UserAth()
  return (
    <div>
      <div>Login</div>
      <div>
        <button onClick={singInWithGoogle}>Iniciar sesion onc google</button>
        <button onClick={signOut}>singOut</button>
      </div>
    </div>
  )
}
