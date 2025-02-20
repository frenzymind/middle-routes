import { Link, Outlet } from 'react-router'
import classes from './MainLayout.module.css'
import { useAuth } from '../shared/providers/auth-provider/auth-context'

export function MainLayout() {
  const { isAuth } = useAuth()

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
      <Outlet />
    </>
  )
}
