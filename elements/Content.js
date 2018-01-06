import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

const Wrapper = styled.div`
  h2, h3, h4 {
    font-weight: bold;
    margin: 0 0 .5rem;
    font-size: 2rem;
  }
  p {
    margin-bottom: 1rem;
  }
`

const Content = ({md}) => {
  return (
    <Wrapper>
      <ReactMarkdown source={md} />
    </Wrapper>
  )
}

export default Content
