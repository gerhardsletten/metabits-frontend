import React from 'react'
import {Col, Row} from 'react-styled-flexboxgrid'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import Title from '../elements/Title'
import Content from '../elements/Content'
import Icon, {RoundedIcon} from '../elements/Icon'
import Button from '../elements/Button'

const Page = ({title, subTitle, icon, content, parent}) => {
  return (
    <div>
      <Row>
        <Col mdOffset={2} md={8} xs={12}>
          {icon && (
            <Row center='xs'>
              <Col xs={12}>
                <RoundedIcon icon={icon} mt={2} bg='primary' color='white' size={4} />
              </Col>
            </Row>
          )}
          <Title level={1} center mt={1}>{title}</Title>
          <Title level={2} center mt={1} mb={4} thin color='gray'>{subTitle}</Title>
          <Content md={content} />
          {parent && (
            <Row center='xs'>
              <Col xs={12}>
                <Button primary to={parent.id} pl={2} pr={2}><Icon icon='left' mr={1} /> Tilbake til {parent.title}</Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  )
}

const pageQuery = gql`
  query page ($id: ID!, $parentId: ID!) {
    page: Page (id: $id) {
      title
      subTitle
      content
      icon
    }
    # move to another component
    parent: Page (id: $parentId) {
      title
      id
    }
  }
`

export default graphql(pageQuery, {
  options: ({path}) => {
    const pathElemnts = path.split('/')
    return {
      variables: {
        id: path,
        parentId: pathElemnts.filter((item, i) => i < (pathElemnts.length - 1)).join('/')
      }
    }
  },
  props: ({data: {page, parent}}) => {
    return {
      ...page,
      parent
    }
  }
})(Page)
