import { Wrapper, Content } from './Grid.styles'

type Props ={
  header:string
  children:React.ReactNode
}

const Grid = ({ header, children }:Props) => {
  return (
    <Wrapper>
      <h1>{header}</h1>
      <Content>{children}</Content>
    </Wrapper>
  )
}

export default Grid
