import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import BottomTabNavigation from './BottomTabNavigation';

// export default MainNavigation;
const Navigation = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
