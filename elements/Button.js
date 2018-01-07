import React from 'react'
import styled from 'styled-components'
import {Link} from '../routes'
import Element from './Element'

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

const BasicButton = Element.withComponent('button').extend`
  text-decoration: none;
  text-align: center;
  border: none;
  display: ${props => props.block ? 'flex' : 'inline-flex'};
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  outline: none;
  box-shadow: ${props => props.shadow ? props.theme.shadow : 'none'};
  color: ${props => buttonColor(props)};
  background-color: ${props => buttonBackground(props)};
  &:hover {
    text-decoration: ${props => props.link && props.route ? 'underline' : 'none'};
    cursor: ${props => props.route || props.onClick ? 'pointer' : 'default'};
    color: ${props => buttonColor(props, true)};
    background-color: ${props => buttonBackground(props, true)};
  }
`
const ActionButton = BasicButton.withComponent('button').extend`
  cursor: pointer;
`
const LinkButton = ActionButton.withComponent('a')

const Button = (rawProps) => {
  const props = {
    pt: .75, pb: .75, pl: 1, pr: 1,
    ...rawProps
  }
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
