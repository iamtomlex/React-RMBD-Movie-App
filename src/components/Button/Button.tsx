import { Wrapper } from './Button.styles'

type Props= {
  text:string
  handleClick:()=>void
}

const Button = ({ text, handleClick }:Props) => {
  return (
    <Wrapper type='button' onClick={handleClick}>
      {text}
    </Wrapper>
  )
}

export default Button
