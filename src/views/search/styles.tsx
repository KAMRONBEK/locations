import {StyleSheet} from 'react-native';
import {colors, deviceHeight} from '../../constants';

export const styles = StyleSheet.create({
    searchbar: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 10,
        shadowColor: colors.gray,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
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
        color: colors.textGray,
    },
});
