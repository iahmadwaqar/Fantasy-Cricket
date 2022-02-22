// import 'react-native-gesture-handler';
import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import PaperProviderWrapper from './config/Theming';
import Navigation from './config/Navigation';

const client = new ApolloClient({
  uri: 'https://apiv2.cricket.com/cricket',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <PaperProviderWrapper>
        <Navigation />
      </PaperProviderWrapper>
    </ApolloProvider>
  );
};

export default App;
