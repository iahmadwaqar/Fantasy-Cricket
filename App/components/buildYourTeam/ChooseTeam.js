import React, {useEffect, useState} from 'react';
import {useDispatch, useStore} from 'react-redux';
import {useQuery, gql} from '@apollo/client';
import EventEmitter from 'eventemitter3';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Title, Portal, Modal} from 'react-native-paper';

import chooseTeamQuery from '../../constants/queries/chooseTeamQuery';
import colors from '../../constants/colors';
import LoadingIndicator from '../LoadingIndicator';

const getTeamQuery = gql`
  ${chooseTeamQuery}
`;

const eventManager = new EventEmitter();

const ChooseTeam = ({navigation}) => {
  const store = useStore();
  const buildYourTeam = store.getState().buildYourTeam;

  const teamIdOfFirstPlayer = buildYourTeam.selectedPlayers[0].teamID;
  const [team1Id] = useState(teamIdOfFirstPlayer);

  const apiVariables = {
    matchID: buildYourTeam.matchID,
    playerIds: buildYourTeam.selectedPlayers.map(player => player.playerID),
    leagueType: buildYourTeam.chooseLeague,
    selectCriteria: buildYourTeam.chooseLogic,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBobnVtYmVyIjoiIiwiZW1haWwiOiJraHViYmFpYkBnbWFpbC5jb20iLCJfaWQiOiI2MTJhYzI3YTVlYTgwMDRkYjA5MTY3NjIifSwiaWF0IjoxNjMwMTkyMjc5LCJleHAiOjE2NjE3MjgyNzl9.amWAzCNzw56K2TT8lRQ_kM7xER1qxkeNsjmOdoFPUVg',
  };

  const {error, loading, data, refetch} = useQuery(getTeamQuery, {
    variables: apiVariables,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const focusedListener = navigation.addListener('focus', () => {
      refetch();
    });

    eventManager.addListener('changePlayer', points => {
      console.log('Points', points);
    });

    return () => {
      focusedListener;
      eventManager.removeAllListeners();
    };
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    console.log(error);
    return <Text>Error...</Text>;
  }

  return (
    <ImageBackground
      style={styles.backgroundContainer}
      source={require('../../assets/images/Ground.jpg')}
      imageStyle={styles.containerImageStyle}>
      <Text style={styles.totalCreditPoints}>
        Total credits: {data.getFrcTeam.totalPoints}
      </Text>
      <Title style={styles.title}>keeper</Title>
      <View style={styles.playersContainer}>
        {data.getFrcTeam.keeper?.map(player => (
          <SinglePlayer
            selectedPlayers={apiVariables.playerIds}
            player={player}
            key={player.playerId}
            team1Id={team1Id}
          />
        ))}
      </View>
      <Title style={styles.title}>batsman</Title>
      <View style={styles.playersContainer}>
        {data.getFrcTeam.batsman?.map(player => (
          <SinglePlayer
            selectedPlayers={apiVariables.playerIds}
            player={player}
            key={player.playerId}
            team1Id={team1Id}
          />
        ))}
      </View>
      <Title style={styles.title}>bowler</Title>
      <View style={styles.playersContainer}>
        {data.getFrcTeam.bowler?.map(player => (
          <SinglePlayer
            selectedPlayers={apiVariables.playerIds}
            player={player}
            key={player.playerId}
            team1Id={team1Id}
          />
        ))}
      </View>
      <Title style={styles.title}>All Rounder</Title>
      <View style={styles.playersContainer}>
        {data.getFrcTeam.all_rounder?.map(player => (
          <SinglePlayer
            selectedPlayers={apiVariables.playerIds}
            player={player}
            key={player.playerId}
            team1Id={team1Id}
          />
        ))}
      </View>
    </ImageBackground>
  );
};

const plaa = {
  __typename: 'squadPlayer',
  captain: '0',
  credits: '8.0',
  isMyPick: true,
  playerCredits: '8.0',
  playerId: '86405',
  playerName: 'Mandy Mangru',
  player_role: 'ALL_ROUNDER',
  playing_xi: null,
  projectedPoints: '22-59',
  selectionPercent: '5.83',
  teamID: '1135',
  teamName: 'WI-W',
  vice_captain: '0',
  totalPoints: '222.0',
};

const SinglePlayer = ({player, team1Id, selectedPlayers}) => {
  const dispatch = useDispatch();

  const [playerData, setPlayerData] = useState(player);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    eventManager.emit('changePlayer', playerData.totalPoints);
  }, [playerData]);

  const isSelected = selectedPlayers.includes(playerData.playerId);

  const backgroundColor =
    playerData.teamID === team1Id ? colors.blue : colors.black;

  const playerNameArray = playerData.playerName.split(' ');
  const playerFistandLastName = `${
    playerNameArray[0]
  } ${playerNameArray.pop()}`;

  return (
    <View style={styles.singlePlayerContainer}>
      {playerData.captain !== '0' && <Text style={styles.captainTag}>C</Text>}

      {playerData.vice_captain !== '0' && (
        <Text style={styles.viceCaptainTag}>VC</Text>
      )}

      {isSelected && (
        <TouchableOpacity
          style={styles.changePlayerContainer}
          onPress={() => {
            console.log('change player');
            setPlayerData(plaa);
          }}>
          <Icon name="exchange" size={20} color={colors.white} />
        </TouchableOpacity>
      )}

      <Image
        style={styles.playerImage}
        source={
          !imageError
            ? {
                uri: `https://images.cricket.com/players/${playerData.playerId}_headshot.png`,
              }
            : require('../../assets/images/Player.png')
        }
        onError={() => {
          setImageError(true);
        }}
      />

      <Text style={[styles.playerName, {backgroundColor}]}>
        {playerFistandLastName}
      </Text>

      <Text style={[styles.playerPoints]}>{playerData.credits}</Text>
    </View>
  );
};

const ExchangePlayerModal = ({hideModal, modalVisible}) => {
  console.log('Modal Built');
  const store = useStore();
  const allPlayers = store.getState().PlayersData;

  return (
    <Portal>
      <Modal visible={modalVisible} onDismiss={hideModal}>
        <View style={styles.modalContainerStyle}>
          <ScrollView>
            {allPlayers.recentForm?.map((player, index) => (
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#fff'}}>{player.name}</Text>
                <Text style={{color: '#fff'}}> -- {player.playerCredits}</Text>
                <TouchableOpacity
                  style={styles.modalPlayerButton}
                  onPress={() => {}}>
                  {/* <Icon name="check" size={20} color={colors.white} /> */}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainerStyle: {
    height: '80%',
    backgroundColor: '#000',
    padding: 20,
  },
  backgroundContainer: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  containerImageStyle: {
    opacity: 0.3,
    resizeMode: 'stretch',
  },
  totalCreditPoints: {
    position: 'absolute',
    color: 'white',
    right: 0,
  },
  title: {
    paddingHorizontal: 10,
    borderRadius: 5,
    color: colors.white,
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  playersContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  changePlayerContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  singlePlayerContainer: {
    alignItems: 'center',
    width: '25%',
  },
  captainTag: {
    color: colors.white,
    position: 'absolute',
    left: 5,
    fontSize: 12,
    backgroundColor: colors.blue,
    paddingHorizontal: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  viceCaptainTag: {
    color: colors.white,
    position: 'absolute',
    left: 0,
    fontSize: 12,
    backgroundColor: colors.blue,
    paddingHorizontal: 2,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  playerImage: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  playerName: {
    color: colors.white,
    padding: 3,
    borderRadius: 10,
    fontSize: 10,
  },
  playerPoints: {
    color: colors.white,
    fontWeight: 'bold',
    borderRadius: 5,
    fontSize: 10,
  },
});

export default ChooseTeam;
