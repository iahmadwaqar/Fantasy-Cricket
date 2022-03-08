import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';

import colors from '../constants/colors';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    backgroundColor: colors.background,
    surface: colors.surface,
    text: colors.text,
    placeholder: colors.placeholder,
    disabled: colors.disabled,
  },
};

const PaperProviderWrapper = ({children}) => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      {children}
    </PaperProvider>
  );
};

export default PaperProviderWrapper;
