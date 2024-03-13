import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Styles } from '../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';

interface DetailsListItemProps {
    textTitle: string
    textValue: string[]
    isOdd: boolean;
}

interface ItemProps {
    text: string
}

const DetailsListItem = ({ textTitle, textValue, isOdd }: DetailsListItemProps) => {

    const Item = ({ text }: ItemProps) => (
        <Text style={styles.textValue}>{text}</Text>
    );

    const content = (
        <View style={styles.rootContainer}>
            <View style={[styles.textContainer, isOdd ? styles.oddItem : styles.evenItem]}>
                <Text style={styles.textTitle}>{textTitle}</Text>
                <FlatList
                    scrollEnabled={false}
                    data={textValue}
                    renderItem={({ item }) => <Item text={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );

    return content
}

export default DetailsListItem

const styles = StyleSheet.create({
    rootContainer: {},
    textContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    oddItem: {
        backgroundColor: Styles.colors.lightYellow,
    },
    evenItem: {
        backgroundColor: Styles.colors.lightBlue,
    },
    textTitle: {
        width: '50%',
        fontSize: 21,
        color: Styles.colors.detailsTitleValue,
        paddingTop: 8,
    },
    textValue: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 21,
        marginVertical: 8,
        color: Styles.colors.detailsTitleValue,
        textAlign: 'left',
    },
})