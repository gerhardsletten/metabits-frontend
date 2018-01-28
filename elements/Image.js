import El from '../elements/Element'

const Image = El.withComponent('img').extend`
  ${props => props.fullWidth ? 'width: 100%;height: auto;' : ''}
  ${props => props.border ? `border: 1px solid ${props.theme.colors.border};` : ''}
  ${props => props.maxWidth ? `max-width: ${props.maxWidth}rem;` : ''}
`

export default Image