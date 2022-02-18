import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

const PaperProviderWrapper = ({children}) => {
  return <PaperProvider>{children}</PaperProvider>;
};

export default PaperProviderWrapper;
