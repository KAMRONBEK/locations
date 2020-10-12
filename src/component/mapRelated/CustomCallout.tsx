import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
    BORDER_RADIUS,
    colors,
    deviceHeight,
    deviceWidth
} from '../../constants';
import {strings} from '../../locales/strings';
import {branchType} from '../../screens/map/Map';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Seperator from '../common/Seperator';
import {onCalloutPress} from '../../redux/thunks';
import {hideCallout} from '../../redux/actions';

interface customCalloutProps {
    visibility: boolean;
    region: branchType;
    onCalloutPress: any;
    hideCallout: any;
}

const CustomCallout = ({
    visibility,
    region,
    onCalloutPress,
    hideCallout
}: customCalloutProps) => {
    const onCardPress = () => {
        onCalloutPress(region);
        console.log('card');
    };
    const onExitPress = () => {
        hideCallout();
        console.log('hide');
    };

    useEffect(() => {
        console.log(visibility);
    }, []);

    //render
    if (!visibility) {
        return null;
    }
    return (
        <View style={styles.plain}>
            <TouchableOpacity onPress={onExitPress}>
                <View style={styles.innerPlain}>
                    <TouchableOpacity onPress={onCardPress}>
                        <View style={styles.container}>
                            <View style={styles.content}>
                                <View style={[styles.typeWrapper]}>
                                    <Text style={[styles.type]}>
                                        {region?.type == 'atm'
                                            ? strings.atm
                                            : region?.type == 'branch'
                                            ? strings.branches
                                            : strings.minibanks}
                                    </Text>
                                </View>
                                <View style={styles.titleWrapper}>
                                    <Text
                                        numberOfLines={2}
                                        style={[
                                            styles.title
                                            // index == 0 && {
                                            // width: deviceWidth * 0.6 - 80,
                                            // },
                                        ]}>
                                        {region?.name}
                                    </Text>
                                </View>

                                <View style={styles.row}>
                                    <Text numberOfLines={2} style={styles.text}>
                                        {region?.address.split(',')[1]},
                                        {region?.address.split(',')[2]}
                                        {/* {item.address} */}
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text numberOfLines={2} style={styles.text}>
                                        {' '}
                                        9:00 - 18:00 Пн, Вт, Ср, Чт, Пт
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    plain: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 3,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerPlain: {
        flex: 1,
        width: deviceWidth,
        justifyContent: 'center',
        paddingHorizontal: 20
        // alignItems: 'center',
    },
    container: {
        // bottom: deviceHeight / 2 + 30,
        // right: 20,
        // left: 20,
        // padding: 10,
        borderColor: colors.lightBlue,
        backgroundColor: colors.ultraLightBlue,
        borderRadius: BORDER_RADIUS,
        paddingVertical: 40
    },
    content: {
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: colors.darkBlack
    },
    typeWrapper: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    type: {
        fontSize: 16,
        textTransform: 'capitalize'
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleWrapper: {
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row'
        // alignItems: 'baseline',
    },
    image: {
        height: 100,
        width: 120,
        borderRadius: BORDER_RADIUS,
        resizeMode: 'cover'
    },
    title: {
        fontSize: 25,
        color: colors.darkBlack,
        textTransform: 'capitalize',
        paddingLeft: 5,
        textAlign: 'center'
    },
    callWrapper: {
        marginLeft: 5,
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigateWrapper: {
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center'
    },
    transferWrapper: {
        flexDirection: 'row-reverse',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    round: {
        width: 40,
        height: 40,
        borderRadius: 80,
        backgroundColor: colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    transferText: {
        color: colors.dimGray,
        fontSize: 13
    },
    lupaWrapper: {
        position: 'absolute'
    }
});

const mapStateToProps = ({calloutState}: any) => ({
    visibility: calloutState.calloutVisibility,
    region: calloutState.currentRegion
});

const mapDispatchToProps = (dispatch: any) => ({
    onCalloutPress: (region: branchType) => dispatch(onCalloutPress(region)),
    hideCallout: () => dispatch(hideCallout())
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCallout);
