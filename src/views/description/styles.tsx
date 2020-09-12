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
        flex: 1,
        zIndex: 3,
        bottom: 2,
        right: 0,
        left: 0,
        top: 0,
    },
    content: {
        borderTopRightRadius: 14,
        backgroundColor: colors.ultraLightBlue,
        borderTopLeftRadius: 14,
        overflow: 'hidden',
        // paddingTop: 10,
        height: deviceHeight + 10,
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
        paddingTop: 10,
        alignItems: 'center',
        // paddingHorizontal: 20,
    },
    column: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.darkBlack,
        maxWidth: '80%',
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
    typeWrapper: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    type: {
        fontSize: 12,
        textTransform: 'capitalize',
    },
    bankingWrapper: {
        backgroundColor: colors.white,
        marginHorizontal: 10,
        borderRadius: BORDER_RADIUS,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    bankingImage: {
        width: 50,
        height: 30,
        resizeMode: 'contain',
    },
    bankingText: {
        fontSize: 20,
        fontStyle: 'italic',
        color: colors.green,
        paddingLeft: 20,
    },
    bankingTag: {
        position: 'absolute',
        top: 5,
        right: 5,
        borderRadius: 2 * BORDER_RADIUS,
        backgroundColor: colors.redTrans,
        paddingHorizontal: 5,
    },
    bankingTagText: {
        color: colors.orange,
        fontSize: 12,
    },
    buttonWrapper: {
        paddingVertical: 10,
        paddingTop: 20,
    },
    servicesWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
    },
    infoWrapper: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    infoTextWrapper: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    infoText: {
        fontSize: 12,
        color: colors.darkGray,
    },
});
