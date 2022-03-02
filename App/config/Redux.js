import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialValue = {
  counter: 0,
};

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialValue);

const ReduxProviderWrapper = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProviderWrapper;
