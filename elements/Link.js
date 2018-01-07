import React from 'react'
import {Link as RouteLink} from '../routes'

const Link = ({to, children, ...rest}) => {
  return (
    <RouteLink route={to}>
      <a href={to} {...rest}>{children}</a>
    </RouteLink>
  )
}

export default Link
