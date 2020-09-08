import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray,
    },
    header: {
        flexDirection: 'row',
        paddingTop: 40,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingBottom: 10,
    },
    backWrapper: {
        borderRadius: 100,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.textLightGray,
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
        color: colors.darkGray,
        paddingLeft: 10,
    },
});
