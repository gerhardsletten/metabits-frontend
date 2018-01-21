import React from 'react'
import Element from './Element'

const TitleLevel1 = Element.withComponent('h1')
const TitleLevel2 = TitleLevel1.withComponent('h2')
const TitleLevel3 = TitleLevel1.withComponent('h3')
const TitleLevel4 = TitleLevel1.withComponent('h4')

const Title = (props) => {
  switch (props.level) {
    case 1:
      return <TitleLevel1 mb={1} size={4} bold {...props} />
    case 2:
      return <TitleLevel2 mb={1} size={3} {...props} />
    case 3:
      return <TitleLevel3 mb={1} size={2} bold {...props} />
    case 4:
      return <TitleLevel4 bold {...props} />
    default:
      return <TitleLevel2 mb={1} bold {...props} />
  }
}

export default Title
