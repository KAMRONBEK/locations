import {StyleSheet} from 'react-native';
import {colors, deviceHeight, BORDER_RADIUS} from '../../constants';

export const styles = StyleSheet.create({
    plane: {
        padding: 20,
    },
    menu: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 20,
        tintColor: colors.green,
    },
    searchbar: {
        flexDirection: 'row',
        backgroundColor: colors.ultraLightBlue,
        borderWidth: 1,
        borderColor: colors.lightGreen,
        borderRadius: BORDER_RADIUS,
        padding: 10,
        // shadowColor: colors.gray,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        // elevation: 5,
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    searchResult: {
        overflow: 'hidden',
        borderRadius: 20,
        maxHeight: deviceHeight * 0.5,
        padding: 5,
    },
    searchItem: {
        paddingVertical: 10,
    },
    searchResultText: {
        fontSize: 14,
        // fontWeight: '900',
        fontStyle: 'italic',
        color: colors.black,
    },
});