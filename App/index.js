// import 'react-native-gesture-handler';
import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import PaperProviderWrapper from './config/Theming';
import ReduxProviderWrapper from './config/Redux';
import Navigation from './navigation/Navigation';

const client = new ApolloClient({
  uri: 'https://apiv2.cricket.com/cricket',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ReduxProviderWrapper>
        <PaperProviderWrapper>
          <Navigation />
        </PaperProviderWrapper>
      </ReduxProviderWrapper>
    </ApolloProvider>
  );
};

export default App;
