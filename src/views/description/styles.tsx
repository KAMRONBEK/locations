import {StyleSheet} from 'react-native';
import {
    DESC_WIDTH,
    colors,
    DESC_HEIGHT,
    CARD_WIDTH,
    BORDER_RADIUS,
    deviceHeightW,
    deviceHeight,
} from '../../constants';

export const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        flex: 1,
    },
    content: {
        borderTopRightRadius: 14,
        backgroundColor: colors.ultraLightBlue,
        borderTopLeftRadius: 14,
        overflow: 'hidden',
        paddingTop: 10,
        height: deviceHeight,
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
        color: colors.darkBlack,
    },
    text: {
        fontWeight: '300',
        fontSize: 13,
        color: colors.textGray,
    },
    scrollView: {},
    bannerImage: {
        width: CARD_WIDTH + 20,
        height: 100,
        resizeMode: 'cover',
        borderRadius: BORDER_RADIUS,
        marginRight: 20,
    },
    card: {
        backgroundColor: colors.lightViolet,
        width: 100,
        height: 75,
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
