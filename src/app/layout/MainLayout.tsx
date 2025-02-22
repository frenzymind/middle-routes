import { Link, Outlet } from 'react-router'
import classes from './MainLayout.module.css'
import { useAuth } from '../providers/auth-provider/auth-context'
import { Suspense, useState } from 'react'

const ErrorComponent = () => {
  throw Error('heck')
  return <p>should never render this</p>
}

export function MainLayout() {
  const { isAuth } = useAuth()
  const [showErrorComponent, setShowErrorComponent] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const breakApp = () => {
    setShowErrorComponent(true)
  }

  const privateLinks: JSX.Element[] = isAuth
    ? [
        <li>
          <Link to='heros'>Герои</Link>
        </li>,
        <li>
          <Link to='locations'>Локации</Link>
        </li>,
        <li>
          <Link to='episodes'>Эпизоды</Link>
        </li>,
        <li>
          <button onClick={breakApp}>Сломать</button>
        </li>,
      ]
    : []

  return (
    <>
      <div className={classes.navbar}>
        <div className={classes.contaier}>
          <ul className={classes.nav + ' ' + classes.navcollaps}>
            <li>
              <Link to='/'>Главная</Link>
            </li>
            {...privateLinks}
          </ul>
        </div>
      </div>
      {showErrorComponent && <ErrorComponent />}
      <Suspense fallback={<h2>Загрузка страницы...</h2>}>
        <Outlet />
      </Suspense>
    </>
  )
}
