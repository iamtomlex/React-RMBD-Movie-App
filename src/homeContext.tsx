import React, { useContext, useEffect, useState } from 'react'
import API, { Movie } from './API'
// import { isPersistedState } from './helpers'

import { Movies } from './API'
// import Movie from './components/Movie'

type ContextType = {
  state: Movies
  loading: boolean
  error: boolean
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>
}

type AppProviderProps = {
  children: React.ReactNode
}

const initialState: Movies = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
}

const AppContext = React.createContext({} as ContextType)

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchMovies = async (page: number, searchTerm = '') => {
    try {
      setError(false)
      setLoading(true)
      const movies = await API.fetchMovies(searchTerm, page)
      console.log(movies)

      setState((prev) => {
        return {
          ...movies,
          results:
            page > 1
              ? [...prev.results, ...movies.results]
              : [...movies.results],
        }
      })

      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    setState(initialState)
    fetchMovies(1, searchTerm)
  }, [searchTerm])

  useEffect(() => {
    if (!isLoadingMore) return

    fetchMovies(state.page + 1, searchTerm)

    setIsLoadingMore(false)
  }, [isLoadingMore, searchTerm, state.page])

  return (
    <AppContext.Provider
      value={{
        state,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        setIsLoadingMore,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

export const useGlobalContext = () => {
  return useContext(AppContext)
}
