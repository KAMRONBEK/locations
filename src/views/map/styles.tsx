import {Platform, StatusBar, StyleSheet} from 'react-native';
import {colors, BORDER_RADIUS, deviceWidth} from '../../constants';

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        // position: 'absolute',
        zIndex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    marker: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },
    callout: {
        backgroundColor: colors.ultraLightBlue,
        width: deviceWidth * 0.9,
        height: 150,
        borderRadius: BORDER_RADIUS,
        borderWidth: 0.5,
        borderColor: colors.lightBlue,
        padding: 7
    },
    calloutText: {
        color: colors.black
    },
    gradient: {
        height: Platform.OS === 'ios' ? 100 : 2 * StatusBar.currentHeight
    }
});
