import {StyleSheet} from 'react-native';
import {
    DESC_WIDTH,
    colors,
    DESC_HEIGHT,
    CARD_WIDTH,
    BORDER_RADIUS,
} from '../../constants';

export const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
    },
    content: {
        borderTopRightRadius: 14,
        backgroundColor: colors.dark,
        borderTopLeftRadius: 14,
        overflow: 'hidden',
        flex: 1,
        paddingTop: 10,
    },
    notch: {
        alignItems: 'center',
    },
    banner: {
        height: DESC_HEIGHT / 3,
        width: DESC_WIDTH,
        resizeMode: 'cover',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
    },
    column: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textLightGray,
    },
    text: {
        fontWeight: '300',
        fontSize: 13,
        color: colors.textGray,
    },
    scrollView: {
        paddingTop: 5,
    },
    bannerImage: {
        width: CARD_WIDTH + 20,
        height: 100,
        resizeMode: 'cover',
        borderRadius: BORDER_RADIUS,
        marginRight: 20,
    },
    card: {
        backgroundColor: colors.lightDark,
        width: 100,
        height: 75,
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
