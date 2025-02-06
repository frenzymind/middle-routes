import { useParams } from 'react-router'
import { Card } from '../../shared/ui/Card/Card'
import episodes from '../../data/episode.json'

export function EpisodeDetailPage() {
  const { id } = useParams<{ id: string }>()

  const episode = episodes.find(h => h.id === Number(id))

  if (!episode) {
    return <h2>Эпизод не найдена</h2>
  }

  return (
    <Card hover={false}>
      <p>Имя: {episode.name}</p>
      <p>Выход в эфир: {new Date(episode.air_date).toLocaleString()}</p>
      <p>Эпизод: {episode.episode}</p>
      <p>Создан: {new Date(episode.created).toLocaleString()}</p>
    </Card>
  )
}
