import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Styles } from '../../constants/Colors'

interface BackButtonProps {
    onPress: () => void
}

const BackButton = ({onPress}: BackButtonProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={onPress}
            >
                <AntDesign name='arrowleft' size={24} color={'white'}/>
            </TouchableOpacity>
        </View>
    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 24
    },
    icon: {
        width: 24,
        height: 24
    }
})