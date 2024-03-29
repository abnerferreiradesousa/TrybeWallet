import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from '../../Redux/reducers/index';

export const getStore = (initialState) => {
  if (!initialState) return createStore(rootReducers, applyMiddleware(thunk));
  return createStore(rootReducers, initialState, applyMiddleware(thunk));
};

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    store = getStore(initialState),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),
  history,
  store,
});

export default renderWithRouterAndRedux;
