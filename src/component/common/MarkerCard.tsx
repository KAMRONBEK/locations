import React, {useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native';
import {CARD_HEIGHT, CARD_WIDTH, BORDER_RADIUS, colors} from '../../constants';
import images from '../../assets/images';
import {
    PanGestureHandler,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {strings} from '../../locales/strings';
import {connect} from 'react-redux';

interface MarkerCardProps {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    mfo: string;
    bank: string;
    phone: string[];
    trial503: string;
    x?: number;
    onPress: any;
}

const MarkerCard = ({
    name,
    address,
    phone,
    onPress,
    distance,
    language,
}: MarkerCardProps) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View style={styles.container}>
                <View style={styles.content}>
                    <Image
                        source={images.temp}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                        <Text numberOfLines={3} style={styles.cardtitle}>
                            {name}
                        </Text>
                        <Text numberOfLines={3} style={styles.cardDescription}>
                            {address}
                        </Text>
                        <Text numberOfLines={3} style={styles.cardDescription}>
                            {phone && phone[0]}
                        </Text>
                        <Text numberOfLines={3} style={styles.cardDescription}>
                            {strings.bestDistance} {distance} {strings.km}
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: 'hidden',
        flexDirection: 'row',
        borderRadius: BORDER_RADIUS,
    },
    cardImage: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        borderRadius: BORDER_RADIUS,
        marginLeft: -30,
    },
    content: {
        padding: 10,
        backgroundColor: colors.lightDark,
        borderRadius: BORDER_RADIUS,
        shadowColor: colors.black,
        shadowRadius: 5,
        shadowOpacity: 0.3,
        flexDirection: 'row',
        marginLeft: 30,
    },
    textContent: {
        padding: 10,
        justifyContent: 'space-between',
    },
    cardtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.textLightGray,
        width: CARD_WIDTH - 150,
    },
    cardDescription: {
        fontSize: 12,
        color: colors.textLightGray,
        width: CARD_WIDTH - 150,
    },
});

const mapStateToProps = ({appState}) => ({
    language: appState.language,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCard);
