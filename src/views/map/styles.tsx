import {StyleSheet} from 'react-native';
import {colors, BORDER_RADIUS} from '../../constants';

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        zIndex: -1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    marker: {
        height: 80,
        width: 80,
        resizeMode: 'contain',
    },
    callout: {
        backgroundColor: colors.ultraLightBlue,
        minWidth: 100,
        maxWidth: 300,
        borderRadius: BORDER_RADIUS,
        borderWidth: 1,
        borderColor: colors.lightBlue,
        padding: 7,
    },
    calloutText: {
        color: colors.black,
    },
});
