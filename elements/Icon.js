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

import wordpress from '@fortawesome/fontawesome-free-brands/faWordpress'

const icons = {
  pencil,
  wordpress,
  mobile,
  rocket,
  globe,
  cog,
  home,
  bars,
  close
}

const Icon = ({icon}) => {
  if (!icons[icon]) {
    return null
  }
  return (
    <FontAwesomeIcon icon={icons[icon]} />
  )
}

export default Icon
