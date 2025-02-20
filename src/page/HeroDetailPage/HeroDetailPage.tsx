import { useParams } from 'react-router'
import { Card } from '../../shared/ui/Card/Card'
import { useFetch } from '../../shared/hook/useFetch'
import { IHero } from '../HeroPage/types'
import { useEffect } from 'react'

export function HeroDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, error, isLoading, sendRequest } = useFetch<IHero>(`https://rickandmortyapi.com/api/character/${id}`)

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
        <img src={data.image} alt='' />
        <p>Имя: {data.name}</p>
        <p>Статус: {data.status}</p>
        <p>Пол: {data.gender}</p>
        <p>Раса: {data.species}</p>
        <p>Создан: {new Date(data.created).toLocaleString()}</p>
      </Card>
    )
  )
}
export default HeroDetailPage
