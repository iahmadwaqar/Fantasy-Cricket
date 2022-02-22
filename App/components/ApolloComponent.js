import React from 'react';
import {Text, View} from 'react-native';
import {ApolloClient, InMemoryCache, useQuery, gql} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
function ApolloComponent() {
  console.log('ExchangeRates');
  const {loading, error, data} = useQuery(EXCHANGE_RATES, {client: client});

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <View style={{backgroundColor: 'blue'}}>
      {data.rates.map(({currency, rate}) => {
        console.log('MAP');
        return (
          <Text key={currency}>
            {currency} {rate}
          </Text>
        );
      })}
    </View>
  );
}

export default ApolloComponent;
