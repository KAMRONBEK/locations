import {StyleSheet} from 'react-native';
import {colors, BORDER_RADIUS} from '../../constants';

export const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: colors.white,
        flex: 1,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    logo: {
        height: 150,
        width: 150,
        borderRadius: 150,
    },
    titleWrapper: {
        paddingHorizontal: 0,
    },
    descWrapper: {
        paddingBottom: 20,
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
    decText: {
        fontSize: 14,
        color: colors.black,
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
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
    },

    round: {
        width: 90,
        height: 40,
        backgroundColor: colors.lightGreen,
        borderRadius: 40,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    roundText: {
        textTransform: 'uppercase',
        fontSize: 20,
    },
    languageImg: {
        width: 25,
        height: 25,
    },
});
