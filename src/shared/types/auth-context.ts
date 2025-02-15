export type IAuthContextValue = {
  isAuth: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}
