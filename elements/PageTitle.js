import React from 'react'
import {Col, Row} from 'react-styled-flexboxgrid'
import Title from './Title'
import Element from './Element'


const PageTitle = ({title, subTitle, ...props}) => {
  return (
    <Element {...props}>
      <Row>
        <Col mdOffset={2} md={8} xs={12}>
          <Title level={1} center mt={1}>{title}</Title>
          <Title level={2} center mt={1} mb={4} thin color='gray'>{subTitle}</Title>
        </Col>
      </Row>
    </Element>
  )
}

export default PageTitle
