import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialValue = {};

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'PLAYERS_LIST':
      return {
        ...state,
        PlayersData: action.payload,
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
