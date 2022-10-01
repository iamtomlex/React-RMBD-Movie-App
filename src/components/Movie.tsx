import { useParams } from 'react-router'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config'
import { useMovieFetch } from '../useMovieFetch'
import Actor from './Actor/Actor'
import BreadCrumb from './BreadCrumb/BreadCrumb'
import Grid from './Grid/Grid'
import MovieInfo from './MovieInfo/MovieInfo'
import MovieInfoBar from './MovieInfoBar/MovieInfoBar'
import { Spinner } from './Spinner/Spinner.styles'
import NoImage from '../assets/no_image.jpg'

const Movie = () => {
  const { movieId } = useParams()

  const { state: movie, loading, error } = useMovieFetch(Number(movieId))

  if (loading) return <Spinner />
  if (error) return <div>Something went wrong...</div>

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo {...movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header='Actors'>
        {movie.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  )
}

export default Movie
