import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {CARD_HEIGHT, CARD_WIDTH} from '../../constants';
import images from '../../assets/images';

interface MarkerCardProps {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    mfo: string;
    bank: string;
    phone: [];
    trial503: string;
    x: number;
}

const MarkerCard = ({name, address, phone}: MarkerCardProps) => {
    return (
        <View style={styles.container}>
            <Image
                source={images.temp}
                style={styles.cardImage}
                resizeMode="cover"
            />
            <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                    {name}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                    {address}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                    {phone[0]}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        // shadowOffset: {x: 2, y: -2},
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: 'hidden',
    },
    cardImage: {
        flex: 3,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 12,
        color: '#444',
    },
});

export default MarkerCard;
