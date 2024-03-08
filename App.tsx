/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, Image, StyleSheet } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import PokemonList from './src/screens/PokemonList';
import { store } from './src/store/store';

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="PokemonList" component={PokemonList} options={{ title: 'Pokemons' }} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return <Drawer.Navigator
    screenOptions={{
      headerTitle: () => (
        <Image style={styles.headerImage} source={require('./src/assets/images/PokemonHeader.png')} />
      ),
      headerStyle: {
        backgroundColor: '#CC3B3B',
      },
      drawerContentStyle: {
        backgroundColor: '#AC3636',
      },
      headerTintColor: 'white',
      drawerActiveBackgroundColor: '#AC3636',
      drawerActiveTintColor: 'white',
      drawerType: 'front',
      overlayColor: '#C4C4C490',
      drawerStyle: {
        width: '75%',
      },
    }}>
    <Drawer.Screen
      name='Pokemons'
      component={StackNavigator}
    />
  </Drawer.Navigator>
}

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <ReduxProvider store={store}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </ReduxProvider>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  headerImage: {
    height: 37,
    width: 101
  },
})