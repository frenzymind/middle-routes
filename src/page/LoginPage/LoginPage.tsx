import { useState } from 'react'
import { useAuth } from '../../app/providers/auth-provider/auth-context'
import { Card } from '../../shared/ui/Card/Card'
import { ILoginFormEvent } from './model/types/login-form'

export function LoginPage() {
  const auth = useAuth()
  const [loginError, setLoginError] = useState('')

  const submitLoginForm = (event: React.FormEvent<ILoginFormEvent>) => {
    event.preventDefault()

    const formElements = event.currentTarget.elements

    const successs = auth.login(formElements.username.value, formElements.pswd.value)

    if (!successs) {
      setLoginError('Неверные данные. Попробуйте ещё раз.')
    }
  }

  return (
    <Card hover={false}>
      <form onSubmit={submitLoginForm} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div aria-hidden='true'>Вход (admin / qwerty)</div>
        <div style={{ marginTop: '10px' }}>
          <input type='text' name='username' placeholder='usename' />
        </div>
        <div style={{ marginTop: '10px' }}>
          <input type='password' name='pswd' placeholder='password' />
        </div>
        <button style={{ marginTop: '10px' }}>Войти</button>
        {loginError}
      </form>
    </Card>
  )
}

export default LoginPage
