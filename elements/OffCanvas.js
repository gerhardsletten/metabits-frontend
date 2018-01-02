import React, {Component} from 'react'
import styled from 'styled-components'

const Canvas = styled.div`
  background: rgba(100%,100%,100%,.9);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: ${props => props.active ? 'translate(0%, 0px)' : 'translate(0%, 20%) scale(.8)'};
  opacity: ${props => props.active ? 1 : 0};
  transition: transform 200ms;
  backface-visibility: ${props => props.active ? 'visible' : 'hidden'};
  z-index: ${props => props.active ? 150 : -1000};
`
const CanvasInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

export default class OffCanvas extends Component {
  componentWillReceiveProps (nextProps) {
    if (process.browser && this.props.visible !== nextProps.visible) {
      document.body.style.overflow = nextProps.visible ? 'hidden' : ''
    }
  }
  render () {
    const {visible, children} = this.props
    return (
      <Canvas active={visible}>
        <CanvasInner>
          {children}
        </CanvasInner>
      </Canvas>
    )
  }
}
