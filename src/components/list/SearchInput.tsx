import React from 'react'
import { Text, TextInput, View, StyleProp, TextInputProps, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Styles } from '../../constants/Colors'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

interface InputProps {
    textInputConfig: TextInputProps,
    style?: ViewStyle
}

const SearchInput = ({ textInputConfig, style }: InputProps) => {

    let inputStyles: StyleProp<TextStyle> = [styles.input]

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    const content = (
        <View style={[styles.inputContainer, style]}>
            <FontAwesome name="search" size={18} color={Styles.colors.searchInput}/>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
    return content
}

export default SearchInput

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 23,
        borderBottomColor: Styles.colors.searchInput,
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    label: {
        fontSize: 12,
        marginBottom: 4
    },
    input: {
        flex: 1,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top"
    },
})