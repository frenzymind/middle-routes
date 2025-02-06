import { Link, Outlet } from 'react-router'
import classes from './MainLayout.module.css'

export function MainLayout() {
  return (
    <>
      <div className={classes.navbar}>
        <div className={classes.contaier}>
          <ul className={classes.nav + ' ' + classes.navcollaps}>
            <li>
              <Link to='/'>Главная</Link>
            </li>
            <li>
              <Link to='heros'>Герои</Link>
            </li>
            <li>
              <Link to='locations'>Локации</Link>
            </li>
            <li>
              <Link to='episodes'>Эпизоды</Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  )
}
