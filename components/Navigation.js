import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const Navigation = ({navigation, path, children}) => {
  return children({navigation})
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
  props: ({data, ownProps: {path}}) => {
    return {
      navigation: data.allNavigationItems && data.allNavigationItems.map(({title, Page: {id: uri}}) => {
        const route = `${uri}`
        const active = route === path
        return {
          title,
          uri,
          active
        }
      })
    }
  }
})(Navigation)
