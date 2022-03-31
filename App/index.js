// import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import SplashScreen from 'react-native-splash-screen';

import PaperProviderWrapper from './config/Theming';
import ReduxProviderWrapper from './config/Redux';
import Navigation from './navigation/Navigation';

const client = new ApolloClient({
  uri: 'https://apiv2.cricket.com/cricket',
  cache: new InMemoryCache(),
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ReduxProviderWrapper>
      <ApolloProvider client={client}>
        <PaperProviderWrapper>
          <Navigation />
        </PaperProviderWrapper>
      </ApolloProvider>
    </ReduxProviderWrapper>
  );
};

export default App;
