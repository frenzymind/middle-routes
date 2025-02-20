import { useNavigate } from 'react-router'
import { Card } from '../../shared/ui/Card/Card'
import { List } from '../../shared/ui/List/LIst'
import { useSortParams } from '../../shared/hook/useSortParams/useSortParams'
import { Sort } from '../../shared/ui/Sort/Sort'
import { ISortOrder } from '../../shared/types/sort'
import { sortDate } from '../../shared/lib/sortDate'
import { IEpisode } from './types'
import { useState, useEffect } from 'react'
import { useFetch } from '../../shared/hook/useFetch'
import { IRickAndMortyResponse } from '../../shared/types/api'
import { InfinityScroll } from '../../shared/hoc/InfinityScroll'

export function EpisodePage() {
  const [order, setOrder] = useSortParams()
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const { data, error, isLoading, sendRequest } = useFetch<IRickAndMortyResponse<IEpisode>>(
    'https://rickandmortyapi.com/api/episode'
  )
  const [episodes, setEpisodes] = useState<IEpisode[]>([])

  useEffect(() => {
    sendRequest({
      params: {
        page,
      },
    })
  }, [page, sendRequest])

  useEffect(() => {
    if (!data) {
      setEpisodes([])
      return
    }

    if (data.info.next) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }

    setEpisodes(prev => [...prev, ...data.results])
  }, [data])

  const handleScroll = () => {
    if (hasMore && !isLoading && !error) {
      setPage(prevPage => prevPage + 1)
    }
  }

  const handleClick = (id: number) => {
    navigate(`/episode/${id}`)
  }

  const handleChangeSortOrder = (sortOrder: ISortOrder) => {
    setOrder(sortOrder)
  }

  const episodeCards = episodes
    .slice(0)
    .sort((l, r) => sortDate(order, l.created, r.created))
    .map(episode => (
      <div key={episode.id}>
        <Card>
          <h2 onClick={() => handleClick(episode.id)}>{episode.name}</h2>
          <h3>{new Date(episode.created).toLocaleString()}</h3>
        </Card>
      </div>
    ))

  return (
    <InfinityScroll onScrollEnd={handleScroll}>
      <Sort sortOrder={order} sortChange={e => handleChangeSortOrder(e)} />
      <List>{episodeCards}</List>
    </InfinityScroll>
  )
}
