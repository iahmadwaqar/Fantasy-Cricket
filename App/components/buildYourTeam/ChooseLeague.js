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

const ChooseLeague = ({navigation}) => {
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
      <Title style={styles.titleMain}>Choose a League </Title>
      <Text style={styles.descriptionMain}>Choose a league to start with</Text>
      <ButtonComponent
        onPress={onPress}
        selected={selected}
        title="Grand League"
        value={'grand_league'}
        description="
            World's biggest fantasy cricket league."
        image={require('../../assets/images/GrandLeague.png')}
      />
      <ButtonComponent
        onPress={onPress}
        selected={selected}
        title="Small League"
        value={'small_league'}
        description="Fewer teams, fiercer competition"
        image={require('../../assets/images/SmallLeague.png')}
      />
      <ButtonComponent
        onPress={onPress}
        selected={selected}
        title="One V One"
        value={'one_v_one'}
        description="A head-tohead due against your rival."
        image={require('../../assets/images/OneVOne.png')}
      />
      <Button
        mode="contained"
        onPress={() => {
          if (selected) {
            dispatch({
              type: 'CHOOSE_LEAGUE',
              payload: selected,
            });
            navigation.jumpTo('ChoosePlayers');
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
  selected,
  value,
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
        <View>
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
    height: 70,
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
    fontSize: 11,
  },
  descriptionMain: {
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 40,
  },
  titleMain: {
    fontSize: 25,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default ChooseLeague;
