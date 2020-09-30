import {Platform, StyleSheet} from 'react-native';
import {colors, BORDER_RADIUS} from '../../constants';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        resizeMode: 'contain',
    },
    imageBanner: {
        position: 'absolute',
        borderWidth: 10,
        top: 0,
    },
    boxWrapper: {},
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingTop: 40,
        paddingBottom: 0,
    },
    logoWrapper: {
        borderRadius: 150,
        elevation: 5,
        shadowColor: colors.green,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        borderWidth: 0.2,
        borderColor: colors.green,
        shadowOpacity: 0.9,
        shadowRadius: 10,
        overflow: 'hidden',
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    titleWrapper: {
        paddingHorizontal: 0,
    },
    descWrapper: {
        padding: 10,
        paddingHorizontal: 20,
    },

    content: {},

    title: {
        fontSize: 20,
        color: colors.green,
    },
    descText: {
        color: colors.black,
        fontSize: 14,
    },
    name: {
        fontSize: 25,
        color: colors.darkBlack,
    },
    link: {
        fontSize: 14,
        color: colors.blue,
        textDecorationLine: 'underline',
        opacity: 0.7,
    },
    text: {
        paddingTop: 10,
        color: colors.darkBlack,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'rgba(0,100,0,0.1)',
        width: 140,
        height: 120,
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-around',
    },
    selectWrapper: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
        right: 0,
        ...Platform.select({
            ios: {
                top: 40,
            },
            android: {
                top: 10,
            },
            default: {
                // other platforms, web for example
                top: 5,
            },
        }),
    },
    round: {
        width: 80,
        height: 30,
        backgroundColor: colors.lightGreen,
        borderRadius: BORDER_RADIUS,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    roundText: {
        textTransform: 'uppercase',
        fontSize: 16,
    },
    languageImg: {
        width: 20,
        height: 20,
    },
    socialWrapper: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 40,
    },
});
