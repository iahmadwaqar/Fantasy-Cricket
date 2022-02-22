import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3db',
    accent: '#f0f',
  },
};

const PaperProviderWrapper = ({children}) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

export default PaperProviderWrapper;
