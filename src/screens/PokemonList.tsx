import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {FunctionComponent} from 'react';
import {RootState} from '../store/store';

const PokemonList: FunctionComponent = () => {
  const screenState = useSelector((state: RootState) => state.pokemonList);

  return (
    <View style={styles.container}>
      {screenState.loading && <Text style={styles.text}>LOADING</Text>}
      {screenState.error && <Text style={styles.text}>ERROR</Text>}
      {!screenState.loading && !screenState.error && (
        <Text style={styles.text}>Pokemon List</Text>
      )}
    </View>
  );
};

export default PokemonList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});
