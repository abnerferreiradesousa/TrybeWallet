import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import rootReducers from '../../store/reducers';

const renderWithRedux = (
  component,
  {
    initialState = {},
    store = createStore(rootReducers, initialState),
  } = {},
) => ({
  ...render(
    <Provider store={ store }>
      {component}
    </Provider>,
    store,
  ),
});

export default renderWithRedux;
