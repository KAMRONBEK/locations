import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import images from '../../assets/images';
import {BORDER_RADIUS, colors, deviceWidth} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {strings} from '../../locales/strings';
import {connect} from 'react-redux';
import {markerPressed} from '../../redux/thunks';
import {cardPressed} from '../../redux/thunks';

const ListItem = ({item, index, cardPressed}) => {
    // alarm-outline
    // business-outline
    //bus-outline

    const onPress = useCallback(() => {
        cardPressed(item);
        console.log(item);
    }, [item]);

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View>
                <Image style={styles.image} source={images.banner1} />
            </View>
            <View>
                <View style={styles.row}>
                    <Ionicons
                        name="business-outline"
                        size={15}
                        color={colors.green}
                    />
                    <Text style={styles.title}>{item.name}</Text>
                </View>
                <View style={styles.row}>
                    <Ionicons
                        name="ios-navigate-outline"
                        size={15}
                        color={colors.green}
                    />
                    <Text numberOfLines={2} style={styles.text}>
                        {item.address}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Ionicons
                        name="alarm-outline"
                        size={15}
                        color={colors.green}
                    />
                    <Text style={styles.text}>9:00 - 16:00</Text>
                </View>
                <View style={styles.row}>
                    <Ionicons
                        name="wallet-outline"
                        size={15}
                        color={colors.green}
                    />
                    <Text style={styles.text}>{item.type}</Text>
                </View>
                <View style={styles.row}>
                    <Ionicons
                        name="bus-outline"
                        size={15}
                        color={colors.green}
                    />
                    <Text style={styles.text}>
                        {item.distance} {strings.km}{' '}
                        {index == 0 && (
                            <Text style={styles.accent}>
                                {'    '}
                                {strings.closestOne}
                            </Text>
                        )}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        backgroundColor: colors.lightGreen,
        borderRadius: BORDER_RADIUS,
        padding: 10,
        flexDirection: 'row',
    },
    row: {
        marginBottom: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: BORDER_RADIUS,
        top: -10,
        left: -20,
    },
    title: {
        maxWidth: deviceWidth * 0.6,
        fontSize: 16,
        color: colors.darkGray,
        paddingLeft: 10,
    },
    text: {
        fontSize: 13,
        color: colors.darkBlack,
        maxWidth: deviceWidth * 0.6,
        paddingLeft: 10,
    },
    accent: {
        color: colors.lightBlue,
    },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    cardPressed: (region) => dispatch(cardPressed(region)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
