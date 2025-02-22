import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useFetch } from '../../shared/hook/useFetch'
import { Card } from '../../shared/ui/Card/Card'
import { IEpisode } from '../EpisodePage/model/types/episode'

export function EpisodeDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data, error, isLoading, sendRequest } = useFetch<IEpisode>(`https://rickandmortyapi.com/api/episode/${id}`)

  useEffect(() => {
    sendRequest()
  }, [])

  if (isLoading) {
    return <h2>Загрузка...</h2>
  }

  if (!data && !error) {
    return <h2>Герой не найден</h2>
  }

  if (error) {
    return <h2>Ошибка получения данных</h2>
  }

  return (
    data && (
      <Card hover={false}>
        <p>Имя: {data.name}</p>
        <p>Выход в эфир: {new Date(data.air_date).toLocaleString()}</p>
        <p>Эпизод: {data.episode}</p>
        <p>Создан: {new Date(data.created).toLocaleString()}</p>
      </Card>
    )
  )
}

export default EpisodeDetailPage
