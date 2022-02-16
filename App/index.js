import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Button,
} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';

import CarouselCards from './components/carousal/CarouselCards';
import MatchDetails from './screens/MatchDetails';
// import RootNavigator from './screens/Drawer';

const client = new ApolloClient({
  uri: 'https://apiv2.cricket.com/cricket',
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={CarouselCards} />
            <Stack.Screen
              name="Match_Details"
              options={{title: 'Match Details'}}
              component={MatchDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});