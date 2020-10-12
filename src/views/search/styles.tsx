import {Platform, StatusBar, StyleSheet} from 'react-native';
import {colors, deviceHeight, BORDER_RADIUS} from '../../constants';

export const styles = StyleSheet.create({
    plane: {
        padding: 20,
        position: 'absolute',
        top: Platform.OS === 'ios' ? 80 : 1.5 * StatusBar.currentHeight,
        right: 0,
        left: 0,
        zIndex: 2
    },
    menu: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: colors.green
    },
    searchbar: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: BORDER_RADIUS,
        padding: 5,
        // shadowColor: colors.green,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 50,
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    searchResult: {
        overflow: 'hidden',
        borderRadius: 20,
        maxHeight: deviceHeight * 0.5,
        padding: 5
    },
    searchItem: {
        paddingVertical: 10
    },
    searchResultText: {
        fontSize: 14,
        // fontWeight: '900',
        fontStyle: 'italic',
        color: colors.black
    }
});
