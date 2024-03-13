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
import PokemonListScreen from './src/screens/PokemonListScreen';
import { store } from './src/store/store';

import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonDetailsScreen from './src/screens/PokemonDetailsScreen';
import BackButton from './src/components/common/BackButton';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
      name="PokemonsList"
      component={PokemonListScreen}
      options={{ title: 'Pokemons' }}
    />
  </Drawer.Navigator>
}

function StackNavigator() {

  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Pokemons"
        component={DrawerNavigator}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='PokemonDetails'
        component={PokemonDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <Image style={styles.headerImage} source={require('./src/assets/images/PokemonHeader.png')} />
          ),
          headerLeft: () => (
            <BackButton onPress={() => navigation.goBack()} />
          ),
          headerStyle: {
            backgroundColor: '#CC3B3B',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <ReduxProvider store={store}>
        <NavigationContainer>
          <StackNavigator />
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