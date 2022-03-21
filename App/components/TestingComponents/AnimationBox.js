import React from 'react';

import {Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

function AnimationBox() {
  const [val, setVal] = React.useState(0);
  const offset = useSharedValue(0);
  console.log('sharedVal.value', offset);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value * 255}],
    };
  });

  return (
    <>
      <Animated.View
        style={[
          animatedStyles,
          {
            backgroundColor: 'red',
            width: 100,
            height: 100,
          },
        ]}
      />
      <Button
        onPress={() => {
          offset.value = Math.random();
          setVal(Math.random());
        }}
        title="Move"
      />
      <Text>{val}</Text>
    </>
  );
}

export default AnimationBox;
