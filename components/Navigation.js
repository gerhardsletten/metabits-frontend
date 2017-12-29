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

const Navigation = ({navigation, path}) => {
  if (!navigation) {
    return null
  }
  return (
    <Nav>
      {navigation.map(({title, uri}, i) => {
        const route = `/${uri}`
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
  query navigation {
    navigation: pages(where: {
      parent:"0"
      orderby: {
        field:MENU_ORDER
        order:ASC
      }
    }, first:5){
        edges{
          node{
            title
            uri
          }
        }
      }
  }
`

export default graphql(qlQuery, {
  props: ({data}) => {
    return {
      navigation: data.navigation && data.navigation.edges.map(({node: {title, uri}}) => {
        return {
          title,
          uri
        }
      }).filter(({uri}) => uri !== config.homeSlug)
    }
  }
})(Navigation)
