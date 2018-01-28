import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

const Wrapper = styled.div`
  & h2,
  & h3,
  & h4 {
    font-weight: bold;
    margin: 0 0 .5rem;
    font-size: 2rem;
  }
  & p,
  & ul {
    margin-bottom: 2rem;
  }
  & li {
    margin-left: 2rem;
    margin-bottom: .5rem;
  }
  & strong {
    font-weight: bold;
  }
`

const Content = ({md, children}) => {
  return (
    <Wrapper>
      {md && <ReactMarkdown source={md} />}
      {children}
    </Wrapper>
  )
}

export default Content
