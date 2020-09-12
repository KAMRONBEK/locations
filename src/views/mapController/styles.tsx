import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    content: {
        flex: 1,
        // padding: 20,
        justifyContent: 'space-between',
        borderWidth: 1,
    },
    top: {
        paddingHorizontal: 20,
        paddingTop: 30,
        top: 0,
    },
    bottom: {
        paddingBottom: 20,
    },
    listWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        borderWidth: 1,
        borderColor: colors.pink,
    },
});
