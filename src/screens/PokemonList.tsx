import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import PokemonListItem from '../components/list/PokemonListItem';
import TypeSelector from '../components/list/TypeSelector';
import { Styles } from '../constants/Colors';
import SearchInput from '../components/list/SearchInput';
import CheckBoxWithTitle from '../components/list/CheckBoxWithTitle';
import React, { useState } from 'react';
import { fetchPokemons } from '../../util/pokemonService';
import { setCaughtPokemons, setPokemons } from '../store/pokemonListSlice';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PokemonListProps { }

const PokemonList = ({ }: PokemonListProps) => {
  const entireState = useSelector((state: RootState) => state.pokemonList);
  const [isFetching, setIsFetching] = useState(false);
  const [showOnlyCaught, setShowOnlyCaught] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedType, setSelectedType] = useState('')
  const dispatch = useDispatch();

  async function TypeSelectorHandler(type: string) {
    setIsFetching(true);
    setSelectedType(type)
    try {
      const pokemons = await fetchPokemons(type);
      const pokemonsWithCaughtStatus = pokemons.map((pokemon) => ({
        ...pokemon,
        status: entireState.catchedPokemons.some((p) => p.id === pokemon.id)
      }));
      dispatch(setPokemons(pokemonsWithCaughtStatus));
    } catch (error) {
      console.error("Failed to fetch pokemons:", error);
    } finally {
      setIsFetching(false);
    }
  }

  function handleToggleShowCaught(isChecked: boolean) {
    setShowOnlyCaught(isChecked);
  };

  function inputChangedHandler(enteredValue: string) {
    setSearchInput(enteredValue.toLowerCase());
  };

  const filteredPokemons = entireState.pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchInput);
  });

  const displayedPokemons = showOnlyCaught
    ? entireState.catchedPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchInput))
    : filteredPokemons;

  useEffect(() => {
    const loadCaughtPokemons = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('caughtPokemons');
        const caughtPokemons = jsonValue != null ? JSON.parse(jsonValue) : [];
        dispatch(setCaughtPokemons(caughtPokemons))

      } catch (e) {
        console.error("Failed to load caughtPokemons:", e);
      }
    };

    loadCaughtPokemons();
  }, [dispatch]);

  const noPokemons = filteredPokemons.length == 0
  const noSelectedType = selectedType == ''
  const bottomPadding = useSafeAreaInsets().bottom

  const content = (
    <View style={[styles.rootContainer]}>
      {entireState.loading && <Text>LOADING...</Text>}
      {entireState.error && <Text>ERROR!</Text>}
      {!entireState.loading &&
        entireState.pokemons !== null &&
        entireState.catchedPokemons !== null && (
          <View style={styles.baseContainer}>
            <SearchInput
              textInputConfig={{
                keyboardType: 'default',
                autoCorrect: false,
                onChangeText(text) { inputChangedHandler(text) },
              }}
              style={styles.searchInput}
            />
            <TypeSelector onSelect={TypeSelectorHandler} />
            <CheckBoxWithTitle disabled={noSelectedType} onToggle={handleToggleShowCaught} />
            <View style={styles.listContainer}>
              {noPokemons ? (
                <Text style={styles.noPokemonsText}>No pokemons</Text>
              ) : (
                <FlatList
                  contentContainerStyle={{ paddingBottom: bottomPadding }}
                  data={displayedPokemons}
                  renderItem={({ item }) => <PokemonListItem pokemon={item} />}
                  keyExtractor={item => item.id.toString()}
                  ListHeaderComponent={(
                    <View style={styles.headerContainer}>
                      <Text style={[styles.headerText, styles.headerName]}>Name</Text>
                      <Text style={[styles.headerText, styles.headerType]}>Type</Text>
                      <Text style={[styles.headerText, styles.headerStatus]}>Status</Text>
                    </View>
                  )}
                />
              )}
            </View>
          </View>
        )}
      {entireState.pokemons === null &&
        entireState.catchedPokemons === null && (
          <Text>No pokemons</Text>
        )}
    </View>
  );

  return content;
};

export default PokemonList;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  baseContainer: {
    flex: 1
  },
  listContainer: {
    backgroundColor: '#CDDEEE',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingBottom: 23,
    paddingTop: 26,
    justifyContent: 'flex-start',
  },
  headerText: {
    fontWeight: 'bold',
    paddingLeft: 35,
    fontSize: 12,
    color: '#6E6E6E',
  },
  headerName: {
    flex: 1.5
  },
  headerType: {
    flex: 1
  },
  headerStatus: {
    flex: 2,
    marginRight: 76
  },
  rowInput: {
    flex: 1,
    backgroundColor: Styles.colors.yellow
  },
  searchInput: {
    height: 31.5
  },
  noPokemonsText: {
    textAlign: 'center',
    marginTop: '50%',
    color: '#6E6E6E',
  },
});
