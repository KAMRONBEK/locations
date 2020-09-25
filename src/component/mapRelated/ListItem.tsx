import React, {useCallback, useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    BackHandler,
    Linking,
} from 'react-native';
import images from '../../assets/images';
import {BORDER_RADIUS, colors, deviceWidth} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {strings} from '../../locales/strings';
import {connect} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import SendIntentAndroid from 'react-native-send-intent';
import Seperator from '../common/Seperator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {branchType} from '../../screens/map/Map';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import {cardPressed} from '../../redux/thunks';
import TimeToolTip from '../common/TimeToolTip';

interface listItemProps {
    item: branchType;
    index: number;
    cardPressed: any;
    language: string;
}

const ListItem = ({item, index, cardPressed, language}: listItemProps) => {
    // alarm-outline
    // business-outline
    // bus-outline

    const onPress = useCallback(() => {
        cardPressed(item);
        console.log(item);
    }, [item]);

    let [sliderVisible, setSliderVisible] = useState(false);

    const imageList = [
        {
            url: 'https://miro.medium.com/max/11730/0*ihTZPO4iffJ8n69_',
            // Optional, if you know the image size, you can set the optimization performance
            // You can pass props to <Image />.
            props: {
                // headers: ...
            },
        },
        {
            url:
                'https://wowslider.net/local-sliders/demo-10/data1/images/road220058.jpg',
        },
    ];

    const onBackPress = () => {
        console.log('back');

        setSliderVisible(false);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
    }, []);

    const onBankingPress = async () => {
        try {
            let isInstalled = await SendIntentAndroid.isAppInstalled(
                'com.ipakyulibank.mobile',
            );
            if (isInstalled) {
                console.log('installed');
                let isOpen = await SendIntentAndroid.openApp(
                    'com.ipakyulibank.mobile',
                    {},
                );
            } else {
                Linking.canOpenURL(
                    'market://details?id=com.ipakyulibank.mobile',
                )
                    .then((supported) => {
                        if (supported) {
                            console.log('accepted');
                            return Linking.openURL(
                                'market://details?id=com.ipakyulibank.mobile',
                            );
                        } else {
                            console.log('an error occured');
                        }
                    })
                    .catch((err) => console.log('an error occured'));
            }
        } catch (error) {
            console.log(error);
        }
    };

    let imageModal = () => (
        <Modal visible={sliderVisible} transparent={false}>
            <ImageViewer
                renderHeader={() => (
                    <TouchableOpacity onPress={() => setSliderVisible(false)}>
                        <View
                            style={{
                                alignSelf: 'flex-end',
                                paddingRight: 15,
                                paddingTop: 15,
                                marginBottom: -15,
                            }}>
                            <Ionicons
                                name="close-outline"
                                size={30}
                                color={colors.pink}
                            />
                        </View>
                    </TouchableOpacity>
                )}
                imageUrls={imageList}
                enableSwipeDown
                enablePreload
                onSwipeDown={() => setSliderVisible(false)}
                useNativeDriver={false}
                loadingRender={() => (
                    <SkypeIndicator color={colors.lightViolet} />
                )}
            />
        </Modal>
    );

    let [labelWidth, setLabelWidth] = useState(0);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.plain,
                {
                    backgroundColor:
                        item.type == 'atm'
                            ? colors.pink
                            : item.type == 'branch'
                            ? colors.red
                            : colors.violate,
                },
            ]}>
            <View style={styles.container}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => setSliderVisible(true)}>
                        <Image style={styles.image} source={images.banner1} />
                        {imageModal()}
                        <View style={styles.lupaWrapper}>
                            <Ionicons
                                name="search-outline"
                                size={60}
                                color={'rgba(255,255,255,0.4)'}
                            />
                        </View>
                    </TouchableOpacity>

                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TimeToolTip
                            beginTime={'09:00:00'}
                            endTime={'18:00:00'}
                        />
                        <Text
                            style={{
                                fontSize: 12,
                                color: colors.textGray,
                            }}>
                            (09:00 - 18:00)
                        </Text>
                    </View>
                </View>
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
                            {item.name}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.typeWrapper,
                            {
                                alignSelf: 'flex-start',
                                backgroundColor:
                                    item.type == 'atm'
                                        ? colors.pinkTrans
                                        : item.type == 'branch'
                                        ? colors.redTrans
                                        : colors.violateTrans,
                            },
                        ]}>
                        <Text
                            style={[
                                styles.type,
                                {
                                    color:
                                        item.type == 'atm'
                                            ? colors.pink
                                            : item.type == 'branch'
                                            ? colors.red
                                            : colors.violate,
                                },
                            ]}>
                            {item.type == 'atm'
                                ? strings.atm
                                : item.type == 'branch'
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
                            {item.address.split(',')[1]},
                            {item.address.split(',')[2]}
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
                    <Seperator width="95%" containerStyle={{paddingTop: 10}} />
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={onBankingPress}>
                            <View style={styles.transferWrapper}>
                                <View
                                    style={{
                                        backgroundColor: colors.lightGreen,
                                        borderRadius: 40,
                                        padding: 5,
                                        marginLeft: -18,
                                        paddingLeft: 20,
                                    }}>
                                    <Text style={styles.transferText}>
                                        {strings.moneyTransfer}
                                    </Text>
                                </View>
                                <View style={styles.round}>
                                    <MaterialCommunityIcons
                                        name="bank-transfer"
                                        color={colors.green}
                                        size={25}
                                        style={{marginLeft: 5}}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <View style={styles.navigateWrapper}>
                                <TouchableOpacity onPress={onPress}>
                                    <MaterialIcons
                                        name="my-location"
                                        size={20}
                                        color={colors.green}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.callWrapper}>
                                <TouchableOpacity
                                    onPress={() =>
                                        Linking.openURL(`tel:${item.phone[0]}`)
                                    }>
                                    <Ionicons
                                        name="call"
                                        size={17}
                                        color={colors.green}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {index == 0 && (
                    <Text style={styles.accent}>{strings.closestOne}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    plain: {
        borderRadius: 4 * BORDER_RADIUS,
        // marginBottom: 15,
        paddingLeft: 3,
        marginBottom: 10,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: BORDER_RADIUS,
        // paddingVertical: 40
        padding: 8,
        flex: 1,
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
    text: {
        fontSize: 12,
        color: colors.darkBlack,
        maxWidth: deviceWidth * 0.5,
    },
    accent: {
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic',
        position: 'absolute',
        top: 0,
        right: 5,
    },
    bankingImg: {
        width: 35,
        height: 35,
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
    content: {
        justifyContent: 'space-between',
        // paddingVertical: 10,
        flex: 1,
        paddingHorizontal: 10,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

const mapStateToProps = ({appState}: any) => ({
    language: appState.language,
});

const mapDispatchToProps = (dispatch: any) => ({
    cardPressed: (region: branchType) => dispatch(cardPressed(region)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
