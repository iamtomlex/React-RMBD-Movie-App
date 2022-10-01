import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config'

import NoImage from '../assets/no_image.jpg'
import { useGlobalContext } from '../homeContext'
import HeroImage from './HeroImage/HeroImage'
import Grid from './Grid/Grid'
import Thumb from './Thumb/Thumb'
import { Spinner } from './Spinner/Spinner.styles'
import SearchBar from './SearchBar/SearchBar'
import Button from './Button/Button'
import { Movie } from '../API'
import React from 'react'

const Home:React.FC = () => {
  const { loading, state, error, searchTerm, setIsLoadingMore } =
    useGlobalContext()

  if (error) return <div>Something went wrong...</div>

  return (
    <>
      {!searchTerm && state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar />
      <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
        {state.results.map((movie:Movie) => {
          const { id, poster_path } = movie
          return (
            <Thumb
              key={id}
              clickable
              image={
                poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${poster_path}`
                  : NoImage
              }
              movieId={id}
            />
          )
        })}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text='Load More' handleClick={() => setIsLoadingMore(true)} />
      )}
    </>
  )
}

export default Home
