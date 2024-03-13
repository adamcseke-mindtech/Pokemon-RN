import { Text, StyleSheet, View, Image, ScrollView } from 'react-native'
import React from 'react'
import PrimaryButton from '../components/common/PrimaryButton';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/RootStackParamList';
import { useEffect, useState } from 'react';
import { fetchPokemon } from '../../util/pokemonService';
import { PokemonDetails } from '../data/PokemonDetails';
import { Styles } from '../constants/Colors';
import DetailsListItem from '../components/details/DetailsListItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PokemonDetailsRouteProp = RouteProp<RootStackParamList, 'PokemonDetails'>;

const PokemonDetailsScreen = () => {
    const route = useRoute<PokemonDetailsRouteProp>();
    const { pokemonName } = route.params;

    const [isFetching, setIsFetching] = useState(false);
    const [pokemon, setPokemon] = useState<PokemonDetails>();
    const [isCaught, setIsCaught] = useState(false);

    const entireState = useSelector((state: RootState) => state.pokemonList);

    useEffect(() => {
        async function getPokemonDetails() {
            try {
                const response = await fetchPokemon(pokemonName);
                setPokemon(response);
                const caughtStatus = entireState.catchedPokemons.some(p => p.id === response?.id);
                setIsCaught(caughtStatus);
                console.log(`Details - Pokemon is caught: ${caughtStatus}, Name: ${response?.name}, id: ${response?.id}`);
            } catch (error) {
                console.error(error);
            } finally {
                setIsFetching(false);
            }
        }

        getPokemonDetails();
    }, [pokemonName, entireState.catchedPokemons]);

    function buttonPressHandler() {
        console.log('Catch')
    }

    const weightValue = pokemon?.weight.toString() ?? "" + 'kg'
    const heightValue = pokemon?.height.toString() ?? "" + 'm'

    const content =
        isFetching ? (
            <Text>Loading</Text>
        ) : (
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: pokemon?.sprites.other['official-artwork'].front_default }}
                            style={styles.image}
                        />
                    </View>

                    <View style={styles.detailsContainer}>
                        <DetailsListItem textTitle='Name' textValue={[pokemonName]} isOdd={false} />
                        <DetailsListItem textTitle='Weight' textValue={[weightValue]} isOdd={true} />
                        <DetailsListItem textTitle='Height' textValue={[heightValue]} isOdd={false} />
                        <DetailsListItem
                            textTitle="Abilities"
                            textValue={pokemon?.abilities.map(ability => ability.ability.name) || ["No abilities found"]}
                            isOdd={true}
                        />
                        <DetailsListItem
                            textTitle='Status'
                            textValue={[isCaught ? 'Caught' : '-']}
                            isOdd={false} />
                    </View>

                    <PrimaryButton
                        style={[
                            styles.button,
                            isCaught ? styles.releaseButton : styles.catchButton
                        ]}
                        caption={isCaught ? 'Release' : 'Catch'}
                        onPress={buttonPressHandler} />
                </View>
            </ScrollView>
        )
    return content
}

export default PokemonDetailsScreen

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1
    },
    text: {
        color: 'black'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 17,
        marginHorizontal: 16,
        backgroundColor: Styles.colors.yellow,
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 1
    },
    detailsContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 32
    },
    button: {
        flex: 1,
        marginTop: 16,
        marginBottom: 44,
        height: 33,
        borderRadius: 10,
        marginHorizontal: 16,
    },
    catchButton: {
        backgroundColor: '#2D6EB5',
    },
    releaseButton: {
        backgroundColor: '#FFCB03',
    },
});