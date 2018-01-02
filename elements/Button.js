import React from 'react'
import styled from 'styled-components'
import {Link} from '../routes'

const isActive = (props, hover) => props.active || !!(hover && !!(props.route || props.onClick))

const buttonColor = (props, hover = false) => {
  if (props.link) {
    if (isActive(props, hover)) {
      return props.theme.primaryActive
    }
    return props.theme.text
  }
  return '#fff'
}

const buttonBackground = (props, hover = false) => {
  if (props.link) {
    return 'none'
  }
  if (props.primary && isActive(props, hover)) {
    return props.theme.primaryActive
  }
  if (props.primary) {
    return props.theme.primary
  }
  if (isActive(props, hover)) {
    return props.theme.secondaryActive
  }
  return props.theme.secondary
}

const BasicButton = styled.div`
  text-decoration: none;
  text-align: center;
  border: none;
  display: ${props => props.block ? 'flex' : 'inline-flex'};
  align-items: center;
  justify-content: center;
  padding: .75rem 1rem;
  border-radius: 3px;
  outline: none;
  box-shadow: ${props => props.shadow ? props.theme.shadow : 'none'};
  margin-right: ${props => props.block || props.tight ? 0 : '1rem'};
  margin-bottom: ${props => props.block ? '.5rem' : 0};
  color: ${props => buttonColor(props)};
  background-color: ${props => buttonBackground(props)};
  &:hover {
    text-decoration: ${props => props.link && props.route ? 'underline' : 'none'};
    cursor: ${props => props.route || props.onClick ? 'pointer' : 'default'};
    color: ${props => buttonColor(props, true)};
    background-color: ${props => buttonBackground(props, true)};
  }
`
const ActionButton = BasicButton.withComponent('button')
const LinkButton = BasicButton.withComponent('a')

const Button = (props) => {
  if (props.onClick) {
    return (
      <ActionButton type={props.type || 'submit'} {...props} />
    )
  }
  if (props.route) {
    return (
      <Link route={props.route}>
        <LinkButton href={props.route} {...props} />
      </Link>
    )
  }
  return (
    <BasicButton {...props} />
  )
}

export const RoundedButton = styled(Button)`
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
  min-width: 4rem;
  min-height: 4rem;
`

export default Button
