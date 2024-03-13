import { StyleSheet, StyleProp, Pressable, View, Text, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

interface ButtonProps {
    caption: string
    style?: StyleProp<ViewStyle>
    onPress: () => void
}

const PrimaryButton = ({ caption, style, onPress }: ButtonProps) => {
    const content = (
        <View style={style}>
            <TouchableOpacity
                onPress={onPress}
            >
                <View style={[styles.button]}>
                    <Text style={[styles.buttonText]}>
                        {caption}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
    return content
}

export default PrimaryButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75,
        // backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4
    }
})