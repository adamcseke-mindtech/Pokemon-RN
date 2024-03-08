import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dropdown } from 'react-native-element-dropdown';
import { Styles } from '../../constants/Colors';
import React, { useEffect, useState } from 'react';
import { fetchPokemonTypes } from '../../../util/pokemonService';
import { PokemonType } from '../../data/PokemonType';

interface TypeSelectorProps {
    onSelect: (type: string) => void
}

const TypeSelector = ({ onSelect }: TypeSelectorProps) => {

    const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);

    useEffect(() => {
        async function getPokemonTypes() {
            try {
                const response = await fetchPokemonTypes();
                setPokemonTypes(response.results);
            } catch (error) {
                console.error(error);
            }
        }

        getPokemonTypes();
    }, []);

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Pokemon Types</Text>
            <Dropdown
                style={[styles.inputContainer]}
                onChange={(value) => onSelect(value.name)}
                placeholderStyle={styles.placeholder}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.icon}
                data={pokemonTypes}
                search
                itemTextStyle={styles.itemText}
                maxHeight={300}
                labelField='name'
                valueField='name'
                searchPlaceholder="Search..."
                placeholder='Select...'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center'
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Styles.colors.typesTitle,
        marginHorizontal: 26,
        marginTop: 25,
        textTransform: 'capitalize'
    },
    inputContainer: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Styles.colors.typeSelectorBorder,
        borderRadius: 6,
        paddingHorizontal: 10,
        marginHorizontal: 26,
        marginBottom: 18,
        marginTop: 25
    },
    input: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontSize: 16,
        height: 40
    },
    placeholder: {
        fontSize: 13,
        color: Styles.colors.typesTitle,
        paddingLeft: 6,
    },
    icon: {
        paddingRight: 6,
    },
    selectedTextStyle: {
        fontSize: 13,
        textTransform: 'capitalize'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 30,
        fontSize: 13,
        borderWidth: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: Styles.colors.searchInput
    },
    itemText: {
        fontSize: 13,
        textTransform: 'capitalize'
    }
});

export default TypeSelector;