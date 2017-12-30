import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import {Link} from '../routes'
import config from '../config'

const Nav = styled.nav`
  margin-left: auto;
  display: none;
  ${breakpoint('tablet')`
    display: block;
  `}
`
const NavItem = styled.a`
  display: inline-block;
  text-decoration: none;
  padding: 1rem;
  color: ${props => props.active ? props.theme.primary : props.theme.text};
  &:hover {
    text-decoration: underline;
  }
`

const Navigation = ({navigation, path, ...props}) => {
  if (!navigation) {
    return null
  }
  return (
    <Nav>
      {navigation.map(({title, Page: {id: uri}}, i) => {
        const route = `${uri}`
        const active = route === path
        return (
          <Link key={i} route={route}>
            <NavItem href={route} active={active}>
              {title}
            </NavItem>
          </Link>
        )
      })}
    </Nav>
  )
}

const qlQuery = gql`
  {
    allNavigationItems(filter: { navigation_id:"primary"}) {
      title
      Page {
        id
      }
    }
  }
`

export default graphql(qlQuery, {
  props: ({data}) => {
    return {
      navigation: data.allNavigationItems
    }
  }
})(Navigation)
