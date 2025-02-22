import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useFetch } from '../../shared/hook/useFetch'
import { Card } from '../../shared/ui/Card/Card'
import { ILocation } from '../LocationsPage/model/types/location'

export function LocationDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data, error, isLoading, sendRequest } = useFetch<ILocation>(`https://rickandmortyapi.com/api/location/${id}`)

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
        <p>Измерение: {data.dimension}</p>
        <p>Тип: {data.type}</p>
        <p>Создан: {new Date(data.created).toLocaleString()}</p>
      </Card>
    )
  )
}
export default LocationDetailPage
