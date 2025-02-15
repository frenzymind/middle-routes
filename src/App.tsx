import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import { MainLayout } from './layout/MainLayout'
import { EpisodeDetailPage } from './page/EpisodeDetailPage/EpisodeDetailPage'
import { EpisodePage } from './page/EpisodePage/EpisodePage'
import { HeroDetailPage } from './page/HeroDetailPage/HeroDetailPage'
import { HeroPage } from './page/HeroPage/HeroPage'
import { LocationDetailPage } from './page/LocationDetailPage/LocationDetailPage'
import { LocationPage } from './page/LocationsPage/LocationPage'
import { LoginPage } from './page/LoginPage/LoginPage'
import { MainPage } from './page/MainPage/MainPage'
import { useAuth } from './shared/providers/auth-provider/auth-context'

function App() {
  const { isAuth } = useAuth()

  let routes: JSX.Element = <></>

  if (isAuth) {
    routes = (
      <>
        <Route index element={<MainPage />} />
        <Route path='heros' element={<HeroPage />} />
        <Route path='hero/:id' element={<HeroDetailPage />} />
        <Route path='locations' element={<LocationPage />} />
        <Route path='location/:id' element={<LocationDetailPage />} />
        <Route path='episodes' element={<EpisodePage />} />
        <Route path='episode/:id' element={<EpisodeDetailPage />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </>
    )
  } else {
    routes = (
      <>
        <Route index element={<LoginPage />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </>
    )
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>{routes}</Route>
    </Routes>
  )
}

export default App
