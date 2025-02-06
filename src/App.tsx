import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import { MainLayout } from './layout/MainLayout'
import { MainPage } from './page/MainPage/MainPage'
import { HeroPage } from './page/HeroPage/HeroPage'
import { LocationPage } from './page/LocationsPage/LocationPage'
import { EpisodePage } from './page/EpisodePage/EpisodePage'
import { HeroDetailPage } from './page/HeroDetailPage/HeroDetailPage'
import { LocationDetailPage } from './page/LocationDetailPage/LocationDetailPage'
import { EpisodeDetailPage } from './page/EpisodeDetailPage/EpisodeDetailPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path='heros' element={<HeroPage />} />
        <Route path='hero/:id' element={<HeroDetailPage />} />
        <Route path='locations' element={<LocationPage />} />
        <Route path='location/:id' element={<LocationDetailPage />} />
        <Route path='episodes' element={<EpisodePage />} />
        <Route path='episode/:id' element={<EpisodeDetailPage />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  )
}

export default App
