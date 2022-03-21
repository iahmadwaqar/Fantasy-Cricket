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
    case 'ADD_PLAYER':
      return {
        ...state,
        selectedPlayers: [
          ...(state.selectedPlayers ? state.selectedPlayers : []),
          action.payload,
        ],
      };
    case 'REMOVE_PLAYER':
      return {
        ...state,
        selectedPlayers: state.selectedPlayers.filter(
          player => player !== action.payload,
        ),
      };
    case 'CLEAR_SELECTED_PLAYERS':
      return {
        ...state,
        selectedPlayers: [],
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
