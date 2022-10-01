import React, {  useEffect, useRef, useState } from 'react'
import { Wrapper, Content } from './SearchBar.styles'

import searchIcon from '../../assets/search-icon.svg'
import { useGlobalContext } from '../../homeContext'



const SearchBar = () => {
  const { setSearchTerm } = useGlobalContext()
  const initial = useRef(true)
  const [state, setState] = useState('')

  useEffect(() => {
    if (initial.current) {
      initial.current = false
      return
    }

    const timer = setTimeout(() => {
      setSearchTerm(state)
    }, 1000)

    return () => clearTimeout(timer)
  }, [setSearchTerm, state])

  const handleSubmit  = (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
  }
  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} onSubmit={(e)=>handleSubmit} alt='' />
        <input
          type='text'
          placeholder='Search Movie'
          onChange={(e) => setState(e.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  )
}

export default SearchBar
