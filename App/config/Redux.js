import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialValue = {
  PlayersData: [],
  buildYourTeam: {
    matchID: '',
    chooseLeague: '',
    chooseLogic: '',
    selectedPlayers: [],
  },
};

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'CHOOSE_MATCH_ID':
      return {
        ...state,
        buildYourTeam: {
          ...state.buildYourTeam,
          matchID: action.payload,
        },
      };

    case 'CHOOSE_LEAGUE':
      return {
        ...state,
        buildYourTeam: {...state.buildYourTeam, chooseLeague: action.payload},
      };

    case 'CHOOSE_LOGIC':
      return {
        ...state,
        buildYourTeam: {...state.buildYourTeam, chooseLogic: action.payload},
      };

    case 'CHOOSE_TEAM_PLAYER':
      return {
        ...state,
        buildYourTeam: {
          ...state.buildYourTeam,
          selectedPlayers: [
            ...state.buildYourTeam?.selectedPlayers,
            action.payload,
          ],
        },
      };

    case 'REMOVE_TEAM_PLAYER':
      return {
        ...state,
        buildYourTeam: {
          ...state.buildYourTeam,
          selectedPlayers: state.buildYourTeam.selectedPlayers.filter(
            player => player !== action.payload,
          ),
        },
      };

    case 'REPLACE_TEAM_PLAYER':
      return {
        ...state,
        buildYourTeam: {
          ...state.buildYourTeam,
          selectedPlayers: state.buildYourTeam.selectedPlayers.map(player => {
            console.log('Old', action.payload.oldPlayer);
            console.log('New', player.playerID);

            if (player.playerID == action.payload.oldPlayer.playerId) {
              console.log('old playerrrrrrrrrrrrrrrrrr');
            }
            return player.playerID === action.payload.oldPlayer.playerId
              ? state.buildYourTeam.selectedPlayers[0]
              : player;
          }),
        },
      };

    case 'CLEAR_TEAM_BUILD':
      return {
        ...state,
        buildYourTeam: {
          matchID: '',
          chooseLeague: '',
          chooseLogic: '',
          selectedPlayers: [],
        },
      };

    case 'PLAYERS_LIST':
      return {
        ...state,
        PlayersData: action.payload,
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
