import React from 'react'
import {Link as RouteLink} from '../routes'

const Link = ({to, children, prefetch, ...rest}) => {
  return (
    <RouteLink route={to} prefetch={prefetch}>
      <a href={to} {...rest}>{children}</a>
    </RouteLink>
  )
}

export default Link
