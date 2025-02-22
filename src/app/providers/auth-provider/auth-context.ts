import { createContext, useContext } from 'react'
import { IAuthContextValue } from './model/auth-contex'

export const AuthContext = createContext<IAuthContextValue>({
  isAuth: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: function (_username: string, _password: string) {
    throw new Error('Function not implemented.')
  },
  logout: function (): void {
    throw new Error('Function not implemented.')
  },
})

export function useAuth() {
  return useContext(AuthContext)
}
