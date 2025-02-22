import { ReactNode, useState } from 'react'
import { AuthContext } from './auth-context'

const USER = { username: 'admin', password: 'qwerty' }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setAuth] = useState(false)

  const login = (username: string, password: string) => {
    if (username === USER.username && password === USER.password) {
      setAuth(true)
      return true
    }

    return false
  }

  const logout = () => {
    setAuth(false)
  }

  return <AuthContext.Provider value={{ isAuth, login, logout }}>{children}</AuthContext.Provider>
}
