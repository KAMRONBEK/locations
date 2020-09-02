import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBlack,
        paddingTop: 40,
    },
    chatArea: {
        paddingHorizontal: 15,
    },
    inputWrapper: {
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 19,
        color: colors.textLightGray,
        paddingLeft: 20,
        paddingBottom: 10,
    },
});
