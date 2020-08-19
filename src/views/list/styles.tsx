import {StyleSheet} from 'react-native';
import {colors, BORDER_RADIUS} from '../../constants';

export default StyleSheet.create({
    footer: {
        paddingBottom: 10,
    },
    markerWrapper: {
        // position: 'absolute',
        alignSelf: 'flex-end',
        right: 10,
        // top: -40,
        width: 40,
        height: 40,
        backgroundColor: colors.lightDark,
        borderColor: colors.gray,
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    locationIcon: {
        padding: 8,
    },
    scrollView: {
        paddingVertical: 10,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});
