import Thumb from '../Thumb/Thumb'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config'
import NoImage from '../../assets/no_image.jpg'
import { Wrapper, Content, Text } from './MovieInfo.styles'

const MovieInfo = ({
  backdrop_path,
  poster_path,
  title,
  overview,
  vote_average,
  directors,
}) => {
  return (
    <Wrapper backdrop={backdrop_path}>
      <Content>
        <Thumb
          image={
            poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${poster_path}`
              : NoImage
          }
          clickable={false}
          alt='movie-thumb'
        />
        <Text>
          <h1>{title}</h1>
          <h3>PLOT</h3>
          <p>{overview}</p>

          <div className='rating-directors'>
            <div>
              <h3>RATING</h3>
              <div className='score'>{vote_average}</div>
            </div>
            <div className='director'>
              {/* <h3>DIRECTOR{directors.length > 1 ? 'S': ''}</h3> */}
              {/* {directors.map((director) => {
                return <p key={director.credit_id}>{director.name}</p>
              })} */}
            </div>
          </div>
        </Text>
      </Content>
    </Wrapper>
  )
}

export default MovieInfo
