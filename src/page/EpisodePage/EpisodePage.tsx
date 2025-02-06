import { useNavigate } from 'react-router'
import episodes from '../../data/episode.json'
import { Card } from '../../shared/ui/Card/Card'
import { List } from '../../shared/ui/List/LIst'
import { useSortParams } from '../../shared/hook/useSortParams/useSortParams'
import { Sort } from '../../shared/ui/Sort/Sort'
import { ISortOrder } from '../../shared/types/sort'
import { sortDate } from '../../shared/lib/sortDate'

export function EpisodePage() {
  const [order, setOrder] = useSortParams()
  const navigate = useNavigate()

  const handleClick = (id: number) => {
    navigate(`/episode/${id}`)
  }

  const handleChangeSortOrder = (sortOrder: ISortOrder) => {
    setOrder(sortOrder)
  }

  const episodeCards = episodes
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
    <>
      <Sort sortOrder={order} sortChange={e => handleChangeSortOrder(e)} />
      <List>{episodeCards}</List>
    </>
  )
}
