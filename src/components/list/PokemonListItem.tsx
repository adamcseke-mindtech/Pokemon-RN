import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { Pokemon } from '../../data/Pokemon';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { catchPokemon, releasePokemon } from '../../store/pokemonListSlice';
import { RootState } from '../../store/store';
import { Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../constants/RootStackParamList';

interface ListItemProps {
    pokemon: Pokemon;
}

const PokemonListItem = ({ pokemon }: ListItemProps) => {
    const entireState = useSelector((state: RootState) => state.pokemonList);
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isCaught, setIsCaught] = useState(false);
    const status = isCaught ? 'Caught' : '-';

    useEffect(() => {
        const caughtStatus = entireState.catchedPokemons.some(p => p.id === pokemon?.id);
        setIsCaught(caughtStatus);
        if (isCaught) {
            console.log('List - Pokemon is caught: ' + caughtStatus + ', Name: ' + `${pokemon.name}` + ', id: ' + `${pokemon.id}` )
        }
    }, [entireState.catchedPokemons, pokemon]);

    function handleCatchRelease() {
        if (isCaught) {
            dispatch(releasePokemon(pokemon.id));
        } else {
            dispatch(catchPokemon(pokemon.id));
        }
    };

    function SelectPokemonHandler() {
        navigation.navigate('PokemonDetails', {
            pokemonName: pokemon.name
        })
    }

    const content = (
        <TouchableOpacity
            onPress={SelectPokemonHandler}
        >
            <View style={styles.itemContainer}>
                <View style={[
                    styles.textsContainer,
                    isCaught ? styles.textsContainerCatched : styles.textsContainerReleased
                ]}>
                    <Text style={[styles.text, styles.textName]}>{pokemon.name}</Text>
                    <Text style={[styles.text, styles.textType]}>{pokemon.type}</Text>
                    <Text style={[styles.text, styles.textStatus]}>{status}</Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        isCaught ? styles.releaseButton : styles.catchButton,
                    ]}
                    onPress={handleCatchRelease}
                >
                    <Text style={styles.buttonText}>
                        {isCaught ? 'Release' : 'Catch'}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return content;
};

export default PokemonListItem;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        height: 31,
        alignItems: 'stretch',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        marginVertical: 15
    },
    textsContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 31,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 7,
        marginRight: 15,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    textsContainerCatched: {
        borderColor: '#FFCB03',
    },
    textsContainerReleased: {
        borderColor: '#2D6EB5',
    },
    text: {
        fontSize: 12,
        textTransform: 'capitalize'
    },
    textName: {
        flex: 3
    },
    textType: {
        flex: 2.3
    },
    textStatus: {
        flex: 1.2
    },
    button: {
        borderRadius: 7,
        height: 31,
        width: 76,
        alignItems: 'center',
        justifyContent: 'center'
    },
    catchButton: {
        backgroundColor: '#2D6EB5',
    },
    releaseButton: {
        backgroundColor: '#FFCB03',
    },
    buttonText: {
        color: 'white',
    }
});
