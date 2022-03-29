import React from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  ToastAndroid,
  AlertIOS,
} from 'react-native';
import {TouchableRipple, Text, Title, Button} from 'react-native-paper';
import colors from '../../constants/colors';

const ChooseLogic = ({navigation}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState('');

  const onPress = itemValue => {
    setSelected(itemValue);
  };

  const displayToast = toastText => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(toastText, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(toastText);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.titleMain}> Add method to your competition </Title>
      <Text style={styles.descriptionMain}>
        Choose one of the following methods to complete your team
      </Text>
      <ButtonComponent
        onPress={onPress}
        selected={selected}
        title="PROJECTED POINTS"
        value={'projected_points'}
        description="
        Our recommendation of players who could fetch the maximum points."
        image={require('../../assets/images/ProjectedPoints.png')}
      />
      <ButtonComponent
        onPress={onPress}
        selected={selected}
        title="SELECTION PERCENTAGE"
        value={'selection_percentage'}
        description="Players who were picked by most users."
        image={require('../../assets/images/SelectionPercentage.png')}
      />
      <ButtonComponent
        onPress={onPress}
        selected={selected}
        title="FANTASY POINTS"
        value={'fantasy_points'}
        description="Players with the maximum fantasy points so far."
        image={require('../../assets/images/FantasyPoints.png')}
      />
      <ButtonComponent
        onPress={onPress}
        selected={selected}
        title="DREAM TEAM APPEARANCE"
        value={'dream_team_appearance'}
        description="Players with the maximum appearances in the Best Fantasy XI to date."
        image={require('../../assets/images/DreamTeamAppearance.png')}
      />
      <Button
        mode="contained"
        onPress={() => {
          if (selected) {
            dispatch({
              type: 'CHOOSE_LOGIC',
              payload: selected,
            });

            navigation.jumpTo('ChooseTeam');
          } else {
            displayToast('Please select a league');
          }
        }}>
        <Text>Next</Text>
      </Button>
    </View>
  );
};

const ButtonComponent = ({
  onPress,
  value,
  selected,
  title,
  description,
  image,
}) => {
  const backgroundColor =
    selected === value ? colors.accent : colors.background;

  return (
    <TouchableRipple
      style={[styles.button, {backgroundColor}]}
      onPress={() => onPress(value)}>
      <View style={styles.buttonContainer}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={{flexShrink: 1}}>
          <Title style={styles.title}>{title}</Title>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 10,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    width: '90%',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  imageContainer: {
    marginHorizontal: 10,
    borderRadius: 100,
    borderColor: colors.border,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    marginVertical: 0,
    paddingVertical: 0,
    textTransform: 'uppercase',
  },
  description: {
    marginVertical: 0,
    paddingVertical: 0,
    fontSize: 12,
    textAlign: 'left',
  },
  descriptionMain: {
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 20,
  },
  titleMain: {
    textAlign: 'center',
    marginHorizontal: 40,
    fontSize: 25,
    textTransform: 'uppercase',
  },
});

export default ChooseLogic;
