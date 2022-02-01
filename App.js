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
import CarouselCards from './components/carousal/CarouselCards';
import MatchDetails from './screens/MatchDetails';

const client = new ApolloClient({
  uri: 'https://apiv2.cricket.com/cricket',
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Stack.Navigator
          initialRouteName="Homer"
          screenOptions={{
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: 'lightblue'},
          }}>
          <Stack.Screen
            name="Home"
            options={{
              title: 'Fantasy Cricket',
            }}
            component={CarouselCards}
          />
          <Stack.Screen
            name="Match_Details"
            options={{title: 'Match Details'}}
            component={MatchDetails}
          />
        </Stack.Navigator>
      </ApolloProvider>
    </NavigationContainer>
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
