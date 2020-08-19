import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

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
        backgroundColor: colors.lightDark,
        minWidth: 100,
    },
    calloutText: {
        color: colors.textLightGray,
    },
});
