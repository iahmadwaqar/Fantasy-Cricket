import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import PaperProviderWrapper from './config/Theming';
import MainNavigation from './config/Navigation';
import {Text} from 'react-native';

const client = new ApolloClient({
  uri: 'https://apiv2.cricket.com/cricket',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProviderWrapper>
        <MainNavigation />
      </PaperProviderWrapper>
    </ApolloProvider>
  );
}
