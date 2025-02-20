import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { InfinityScroll } from '../../shared/hoc/InfinityScroll'
import { useFetch } from '../../shared/hook/useFetch'
import { useSortParams } from '../../shared/hook/useSortParams/useSortParams'
import { sortDate } from '../../shared/lib/sortDate'
import { IRickAndMortyResponse } from '../../shared/types/api'
import { ISortOrder } from '../../shared/types/sort'
import { Card } from '../../shared/ui/Card/Card'
import { List } from '../../shared/ui/List/LIst'
import { Sort } from '../../shared/ui/Sort/Sort'
import classes from './HeroPage.module.css'
import { IHero } from './types'

export function HeroPage() {
  const [order, setOrder] = useSortParams()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const { data, error, isLoading, sendRequest } = useFetch<IRickAndMortyResponse<IHero>>(
    'https://rickandmortyapi.com/api/character'
  )
  const [heroes, setHeroes] = useState<IHero[]>([])

  useEffect(() => {
    sendRequest({
      params: {
        page,
      },
    })
  }, [page, sendRequest])

  useEffect(() => {
    if (!data) {
      setHeroes([])
      return
    }

    if (data.info.next) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }

    setHeroes(prev => [...prev, ...data.results])
  }, [data])

  const navigate = useNavigate()

  const handleHeroClick = (id: number) => {
    navigate(`/hero/${id}`)
  }

  const handleChangeSortOrder = (sortOrder: ISortOrder) => {
    setOrder(sortOrder)
  }

  const handleScroll = () => {
    if (hasMore && !isLoading && !error) {
      setPage(prevPage => prevPage + 1)
    }
  }

  const heroCards = heroes
    .slice(0)
    .sort((l, r) => sortDate(order, l.created, r.created))
    .map(hero => (
      <Card key={hero.id}>
        <div className={classes.cardUserInfo} onClick={() => handleHeroClick(hero.id)}>
          <img src={hero.image} alt='' />
          <div>
            <h2>Имя: {hero.name}</h2>
            <h2>Создан: {new Date(hero.created).toLocaleString()}</h2>
          </div>
        </div>
      </Card>
    ))

  return (
    <InfinityScroll onScrollEnd={handleScroll}>
      <Sort sortOrder={order} sortChange={e => handleChangeSortOrder(e)} />
      <List>{heroCards}</List>
      {error && <h3>Ошибка получения данных</h3>}
    </InfinityScroll>
  )
}
