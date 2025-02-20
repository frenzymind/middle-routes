import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import { MainLayout } from './layout/MainLayout'
import { EpisodeDetailPageLazy } from './page/EpisodeDetailPage/EpisodeDetailPageLazy'
import { EpisodePageLazy } from './page/EpisodePage/EpisodePageLazy'
import { HeroDetailsPageLazy } from './page/HeroDetailPage/HeroDetailPageLazy'
import { HeroPageLazy } from './page/HeroPage/HeroPageLazy'
import { LocationDetailPageLazy } from './page/LocationDetailPage/LocationDetailPageLazy'
import { LocationPageLazy } from './page/LocationsPage/LocationPageLazy'
import { LoginPageLazy } from './page/LoginPage/LoginPageLazy'
import { MainPageLazy } from './page/MainPage/MainPageLazy'
import { useAuth } from './shared/providers/auth-provider/auth-context'

function App() {
  const { isAuth } = useAuth()

  let routes: JSX.Element = <></>

  if (isAuth) {
    routes = (
      <>
        <Route index element={<MainPageLazy />} />
        <Route path='heros' element={<HeroPageLazy />} />
        <Route path='hero/:id' element={<HeroDetailsPageLazy />} />
        <Route path='locations' element={<LocationPageLazy />} />
        <Route path='location/:id' element={<LocationDetailPageLazy />} />
        <Route path='episodes' element={<EpisodePageLazy />} />
        <Route path='episode/:id' element={<EpisodeDetailPageLazy />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </>
    )
  } else {
    routes = (
      <>
        <Route index element={<LoginPageLazy />} />
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
