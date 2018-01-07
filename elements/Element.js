import styled from 'styled-components'

const Element = styled.div`
  ${props => props.mt ? `margin-top: ${props.mt}rem;` : ''}
  ${props => props.mb ? `margin-bottom: ${props.mb}rem;` : ''}
  ${props => props.ml ? `margin-left: ${props.ml}rem;` : ''}
  ${props => props.mr ? `margin-right: ${props.mr}rem;` : ''}
  ${props => props.pt ? `padding-top: ${props.pt}rem;` : ''}
  ${props => props.pb ? `padding-bottom: ${props.pb}rem;` : ''}
  ${props => props.pl ? `padding-left: ${props.pl}rem;` : ''}
  ${props => props.pr ? `padding-right: ${props.pr}rem;` : ''}
  ${props => props.size ? `font-size: ${props.theme.sizes[props.size]}rem;` : ''}
  ${props => props.center ? `text-align: center;` : ''}
`

export default Element
