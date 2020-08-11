import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

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
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderRadius: 40,
        borderWidth: 0.5,
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
});
