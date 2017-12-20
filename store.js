import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const LOAD_NAVIGATION = 'LOAD_NAVIGATION'
const LOAD_NAVIGATION_SUCCESS = 'LOAD_NAVIGATION_SUCCESS'
const LOAD_NAVIGATION_FAIL = 'LOAD_NAVIGATION_FAIL'

const pages = [{
  route: '/',
  name: 'Homepage'
}, {
  route: '/om',
  name: 'About us'
}, {
  route: '/xx',
  name: 'Dynamisk 1'
}, {
  route: '/xx/xx',
  name: 'Dynamisk 2'
}]

const navigation = (state = {data: null, loaded: false}, action) => {
  switch (action.type) {
    case LOAD_NAVIGATION:
      return {
        ...state,
        loading: true
      }
    case LOAD_NAVIGATION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      }
    case LOAD_NAVIGATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

export function isNavigationLoaded (globalState) {
  return globalState.navigation && globalState.navigation.loaded
}

export const loadNavigation = () => (dispatch, getState) => {
  return new Promise((resolve) => {
    dispatch({
      type: LOAD_NAVIGATION
    })
    setTimeout(() => {
      dispatch({
        type: LOAD_NAVIGATION_SUCCESS,
        payload: pages
      })
      resolve(pages)
    })
  })
}

const reducer = combineReducers({
  navigation
})

export const initStore = (initialState = {}) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
