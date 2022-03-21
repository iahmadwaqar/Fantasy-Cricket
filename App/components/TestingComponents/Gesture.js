import React from 'react';

import {Button, View, StyleSheet} from 'react-native';

import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const GestureComponent = ({navigation}) => {
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <View style={styles.ball} />
      </GestureDetector>
      {/* <Button title="Go to Anim" onPress={() => navigation.navigate('Anima')} /> */}
    </GestureHandlerRootView>
  );
};

const gesture = Gesture.Pan()
  .onBegin(() => {
    console.log('onBegin');
  })
  .onUpdate(e => {
    console.log('onUpdate');
  })
  .onEnd(() => {
    console.log('onEnd');
  })
  .onFinalize(() => {
    console.log('onFinalize');
  });

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});

export default GestureComponent;
