import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
    BORDER_RADIUS,
    colors,
    deviceHeight,
    deviceWidth,
} from '../../constants';
import {strings} from '../../locales/strings';
import {branchType} from '../../screens/map/Map';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Seperator from '../common/Seperator';
import {onCalloutPress} from '../../redux/thunks';

interface customCalloutProps {
    visibility: boolean;
    region: branchType;
    onCalloutPress: any;
}

const CustomCallout = ({
    visibility,
    region,
    onCalloutPress,
}: customCalloutProps) => {
    const onPress = () => {
        onCalloutPress(region);
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
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.titleWrapper}>
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.title,
                                    // index == 0 && {
                                    // width: deviceWidth * 0.6 - 80,
                                    // },
                                ]}>
                                {region?.name}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.typeWrapper,
                                {
                                    alignSelf: 'flex-start',
                                    backgroundColor:
                                        region?.type == 'atm'
                                            ? colors.pinkTrans
                                            : region?.type == 'branch'
                                            ? colors.redTrans
                                            : colors.violateTrans,
                                },
                            ]}>
                            <Text
                                style={[
                                    styles.type,
                                    {
                                        color:
                                            region?.type == 'atm'
                                                ? colors.pink
                                                : region?.type == 'branch'
                                                ? colors.red
                                                : colors.violate,
                                    },
                                ]}>
                                {region?.type == 'atm'
                                    ? strings.atm
                                    : region?.type == 'branch'
                                    ? strings.branches
                                    : strings.minibanks}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Ionicons
                                name="location"
                                size={12}
                                color={colors.green}
                                style={{
                                    paddingTop: 2,
                                }}
                            />
                            <Text numberOfLines={2} style={styles.text}>
                                {region?.address.split(',')[1]},
                                {region?.address.split(',')[2]}
                                {/* {item.address} */}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Ionicons
                                name="time"
                                size={12}
                                color={colors.green}
                                style={{
                                    paddingTop: 2,
                                }}
                            />
                            <Text numberOfLines={2} style={styles.text}>
                                {' '}
                                9:00 - 18:00 Пн, Вт, Ср, Чт, Пт
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    plain: {
        position: 'absolute',
        bottom: deviceHeight / 2 + 30,
        right: 20,
        left: 20,
        zIndex: 3,
        padding: 10,
        borderWidth: 0.5,
        borderColor: colors.lightBlue,
        backgroundColor: colors.ultraLightBlue,
        borderRadius: BORDER_RADIUS,
    },
    container: {},
    content: {
        justifyContent: 'space-between',
        // paddingVertical: 10,
        flex: 1,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 12,
        color: colors.darkBlack,
    },
    typeWrapper: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    type: {
        fontSize: 12,
        textTransform: 'capitalize',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        // borderWidth: 1,
        paddingTop: 10,
    },
    row: {
        marginBottom: 5,
        flexDirection: 'row',
        // alignItems: 'baseline',
    },
    image: {
        height: 100,
        width: 120,
        borderRadius: BORDER_RADIUS,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 14,
        color: colors.green,
        textTransform: 'capitalize',
        paddingLeft: 5,
    },
    callWrapper: {
        marginLeft: 5,
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigateWrapper: {
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transferWrapper: {
        flexDirection: 'row-reverse',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    round: {
        width: 40,
        height: 40,
        borderRadius: 80,
        backgroundColor: colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    transferText: {
        color: colors.dimGray,
        fontSize: 13,
    },
    lupaWrapper: {
        position: 'absolute',
    },
});

const mapStateToProps = ({calloutState}: any) => ({
    visibility: calloutState.calloutVisibility,
    region: calloutState.currentRegion,
});

const mapDispatchToProps = (dispatch: any) => ({
    onCalloutPress: (region: branchType) => dispatch(onCalloutPress(region)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCallout);
