import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import pencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import mobile from '@fortawesome/fontawesome-free-solid/faMobileAlt'
import rocket from '@fortawesome/fontawesome-free-solid/faRocket'
import globe from '@fortawesome/fontawesome-free-solid/faGlobe'
import cog from '@fortawesome/fontawesome-free-solid/faCog'
import home from '@fortawesome/fontawesome-free-solid/faHome'
import bars from '@fortawesome/fontawesome-free-solid/faBars'
import close from '@fortawesome/fontawesome-free-solid/faTimes'
import left from '@fortawesome/fontawesome-free-solid/faChevronLeft'

import wordpress from '@fortawesome/fontawesome-free-brands/faWordpress'

import Element from './Element'

const Container = Element.withComponent('i').extend`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;
  vertical-align: baseline;
  text-align: center;
  & svg {
    height: 1em;
    width: 1em;
    margin: 0 auto;
    display: block;
  }
`

const icons = {
  pencil,
  wordpress,
  mobile,
  rocket,
  globe,
  cog,
  home,
  bars,
  close,
  left
}

const Icon = ({icon, ...rest}) => {
  if (!icons[icon]) {
    return null
  }
  return (
    <Container {...rest}>
      <FontAwesomeIcon icon={icons[icon]} />
    </Container>
  )
}

export default Icon

const RoundedContainer = Element.withComponent('i').extend`
  height: 2em;
  width: 2em;
  display: inline-flex;
  font-size: ${props => `${props.size || 2}rem`};
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`

export const RoundedIcon = ({icon, ...rest}) => {
  return (
    <RoundedContainer {...rest}>
      <Icon icon={icon} />
    </RoundedContainer>
  )
}
