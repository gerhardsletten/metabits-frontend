import React from 'react'
import Element from './Element'

const TitleLevel1 = Element.withComponent('h1').extend`
  display:block;
  font-weight: ${props => props.thin ? 'inherit' : 'bold'};
  font-size: 4rem;
  ${props => props.color ? `color: ${props.theme.colors[props.color]};` : ''}
`
const TitleLevel2 = TitleLevel1.withComponent('h2').extend`
  font-size: 3rem;
`
const TitleLevel3 = TitleLevel1.withComponent('h3')
const TitleLevel4 = TitleLevel1.withComponent('h4')

const Title = (props) => {
  switch (props.level) {
    case 1:
      return <TitleLevel1 mb={1} {...props} />
    case 2:
      return <TitleLevel2 mb={1} {...props} />
    case 3:
      return <TitleLevel3 mb={1} {...props} />
    case 4:
      return <TitleLevel4 {...props} />
    default:
      return <TitleLevel2 mb={1} {...props} />
  }
}

export default Title
