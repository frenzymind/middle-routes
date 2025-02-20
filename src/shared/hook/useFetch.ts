import { useCallback, useRef, useState } from 'react'
import { UnknownObject } from '../lib/ts/utility-types'
import { objectKeys } from '../lib/ts/utility-func'

const DEFAULT_OPTIONS: RequestInit = {
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
}

type IUseFetchOptions = {
  params: UnknownObject
}

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T>()
  const [error, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const abortControllerRef = useRef<AbortController>()

  const sendRequest = useCallback(
    ({ params }: IUseFetchOptions = { params: {} }) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      const baseUrl = new URL(url)
      const searchParams = new URLSearchParams()

      objectKeys(params).forEach(p => {
        searchParams.append(p, String(params[p]))
      })

      baseUrl.search = searchParams.toString()

      setLoading(true)
      setError(false)

      fetch(baseUrl, { ...DEFAULT_OPTIONS, signal: abortControllerRef.current.signal })
        .then(response => {
          if (response.ok) {
            setLoading(false)
            return response.json()
          }

          return Promise.reject()
        })
        .then(data => setData(data))
        .catch(error => {
          if (error?.name == 'AbortError') {
            return
          }

          setError(true)
          setData(undefined)
          setLoading(false)
          console.log(error)
        })
    },
    [url]
  )

  return {
    data,
    isLoading,
    error,
    sendRequest,
  }
}
