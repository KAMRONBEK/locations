import {StyleSheet} from 'react-native';
import {colors, BORDER_RADIUS} from '../../constants';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        borderWidth: 1,
        resizeMode: 'contain',
    },
    imageBanner: {
        position: 'absolute',
        borderWidth: 10,
        top: 0,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingTop: 40,
        paddingBottom: 0,
        backgroundColor: 'white',
    },
    logoWrapper: {
        borderRadius: 150,
        elevation: 5,
        shadowColor: colors.black,
        shadowRadius: 5,
        shadowOpacity: 0.3,
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
        color: colors.green,
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
        backgroundColor: colors.ultraLightBlue,
        width: 140,
        height: 120,
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
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
        top: 5,
    },
    round: {
        width: 70,
        height: 30,
        backgroundColor: colors.ultraLightBlue,
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
