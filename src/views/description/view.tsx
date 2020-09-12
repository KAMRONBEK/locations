import React, {useRef, useEffect, useState} from 'react';
import {
    View,
    Image,
    Text,
    Linking,
    TouchableOpacity,
    Platform,
    Animated,
    StatusBar,
    LayoutAnimation,
} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {
    DESC_HEIGHT,
    colors,
    DESC_WIDTH,
    CARD_WIDTH,
    BORDER_RADIUS,
    SPACING_FOR_CARD_INSET,
    FREE_MAP,
    deviceHeight,
    deviceWidth,
    MAP_WITH_SEARCH,
    heightDiff,
    deviceHeightW,
    SCREENS,
} from '../../constants';
import images from '../../assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {callPress, locationPress, getDirections} from '../../redux/thunks';
import {
    setDestinationCoords,
    mapPressed,
    setMapMode,
} from '../../redux/actions';
import {ScrollView} from 'react-native-gesture-handler';
import {strings} from '../../locales/strings';
import RectangleButton from '../../component/common/RectangleButton';
import {navigate} from '../../services/navigationServices';
import DescCard from '../../component/cards/DescCard';
import SendIntentAndroid from 'react-native-send-intent';
import ActionButton from '../../component/common/ActionButton';
import Seperator from '../../component/common/Seperator';
import ServiceItem from '../../component/common/ServiceItem';

const Description = ({
    currentRegion,
    callPress,
    locationPress,
    setDestinationCoords,
    setMapMode,
    descVisibility,
    // getDirections,
    // myRegion,
}) => {
    const _cardPanel = useRef<SlidingUpPanel>(null);
    let [allowDragging, setAllowDragging] = useState(true);

    let [animatedValue] = useState(new Animated.Value(0));
    let imageHeight = animatedValue.interpolate({
        inputRange: [140, deviceHeightW],
        outputRange: [100, 200],
    });
    let imageWidth = animatedValue.interpolate({
        inputRange: [140, deviceHeightW],
        outputRange: [CARD_WIDTH + 20, deviceWidth - 40],
    });
    let imagePadding = animatedValue.interpolate({
        inputRange: [140, deviceHeightW],
        outputRange: [20, 0],
    });
    let backgroundColor = animatedValue.interpolate({
        inputRange: [140, deviceHeightW],
        outputRange: [colors.white, colors.ultraLightBlue],
    });
    let borderRadius = animatedValue.interpolate({
        inputRange: [140, deviceHeightW],
        outputRange: [BORDER_RADIUS, 0],
    });
    let notchVisibility = animatedValue.interpolate({
        inputRange: [140, deviceHeightW],
        outputRange: [1, 0],
    });
    let closeVisibility = animatedValue.interpolate({
        inputRange: [140, deviceHeightW],
        outputRange: [0, 1],
    });
    let paddingTop = animatedValue.interpolate({
        inputRange: [140, deviceHeightW],
        outputRange: [10, 0],
    });

    const onRoutePress = () => {
        if (_cardPanel.current) {
            _cardPanel.current.hide();
        }
        // getDirections(myRegion, currentRegion);
        setDestinationCoords(currentRegion);
    };

    useEffect(() => {
        console.log(currentRegion);
    }, [currentRegion]);

    const onSharePress = () => {
        console.log('share');
        if (_cardPanel.current) {
            _cardPanel.current.hide();
        }
    };

    const onCallPress = () => {};

    const onChatPress = () => {
        navigate(SCREENS.chat, {});
    };

    const onSavePress = () => {};

    let imgs = [images.banner1, images.banner2, images.banner3];

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [descVisibility]);

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
            }
        } catch (error) {
            Linking.canOpenURL('market://details?id=com.ipakyulibank.mobile')
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
    };

    //render
    if (!descVisibility) {
        console.log('desc is not visible');
        return null;
    }

    return (
        <View style={styles.container}>
            <SlidingUpPanel
                ref={_cardPanel}
                draggableRange={{
                    top: DESC_HEIGHT + 10,
                    bottom: 160,
                }}
                minimumVelocityThreshold={100}
                height={DESC_HEIGHT + 10}
                snappingPoints={[140]}
                allowMomentum={true}
                friction={0.1}
                minimumDistanceThreshold={20}
                allowDragging={allowDragging}
                animatedValue={animatedValue}>
                <Animated.View
                    style={[
                        styles.content,
                        {
                            backgroundColor: backgroundColor,
                            borderTopRightRadius: borderRadius,
                            borderTopLeftRadius: borderRadius,
                            paddingTop: paddingTop,
                        },
                    ]}>
                    <Animated.View
                        style={[
                            styles.notch,
                            {
                                opacity: notchVisibility,
                            },
                        ]}>
                        <View
                            style={{
                                borderWidth: 2,
                                width: 40,
                                borderColor: colors.gray,
                                borderRadius: BORDER_RADIUS,
                            }}
                        />
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.row,
                            {
                                paddingTop: paddingTop,
                            },
                        ]}>
                        <Animated.ScrollView
                            horizontal
                            pagingEnabled
                            scrollEventThrottle={1}
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={CARD_WIDTH + 40}
                            snapToAlignment="end"
                            style={[
                                styles.scrollView,
                                {
                                    // paddingTop: paddingTop,
                                },
                            ]}
                            contentInset={{
                                top: 0,
                                left: imagePadding,
                                bottom: 0,
                                right: imagePadding,
                            }}
                            contentContainerStyle={{
                                paddingHorizontal:
                                    Platform.OS === 'android' ? 20 : 0,
                            }}>
                            {imgs.map((image, index) => {
                                return (
                                    <Animated.Image
                                        key={index}
                                        style={[
                                            styles.bannerImage,
                                            {
                                                height: imageHeight,
                                                marginRight: imagePadding,
                                                borderRadius: borderRadius,
                                                width: imageWidth,
                                            },
                                        ]}
                                        source={image}
                                    />
                                );
                            })}
                        </Animated.ScrollView>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 0,
                            }}
                            onPress={() => {
                                if (_cardPanel.current) {
                                    _cardPanel.current.hide();
                                }
                            }}>
                            <Animated.View
                                style={{
                                    padding: 10,
                                    opacity: closeVisibility,
                                }}>
                                <Ionicons
                                    name="close"
                                    size={30}
                                    color={colors.pink}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>

                    <View
                        style={{
                            flex: 1,
                        }}>
                        <ScrollView
                            onTouchStart={() => setAllowDragging(false)}
                            onTouchEnd={() => setAllowDragging(true)}
                            onTouchCancel={() => setAllowDragging(true)}>
                            <View style={styles.column}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                    }}>
                                    <View
                                        style={[
                                            styles.typeWrapper,
                                            {
                                                backgroundColor:
                                                    currentRegion?.type == 'atm'
                                                        ? colors.pinkTrans
                                                        : currentRegion?.type ==
                                                          'branch'
                                                        ? colors.redTrans
                                                        : colors.violateTrans,
                                            },
                                        ]}>
                                        <Text
                                            style={[
                                                styles.type,
                                                {
                                                    color:
                                                        currentRegion?.type ==
                                                        'atm'
                                                            ? colors.pink
                                                            : currentRegion?.type ==
                                                              'branch'
                                                            ? colors.red
                                                            : colors.violate,
                                                },
                                            ]}>
                                            {currentRegion?.type == 'atm'
                                                ? strings.atm
                                                : currentRegion?.type ==
                                                  'branch'
                                                ? strings.branches
                                                : strings.minibanks}
                                        </Text>
                                    </View>
                                    <Text
                                        numberOfLines={2}
                                        style={styles.title}>
                                        {' '}
                                        {currentRegion?.name}
                                    </Text>
                                </View>
                            </View>
                            <Seperator width={'95%'} />
                            <View style={styles.infoWrapper}>
                                <View style={[styles.row]}>
                                    <Ionicons
                                        name="location"
                                        size={15}
                                        color={colors.green}
                                    />
                                    <Text style={styles.text}>
                                        {currentRegion?.address.split(',')[2]}
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Ionicons
                                        name="time"
                                        size={15}
                                        color={colors.green}
                                    />
                                    <Text style={styles.text}>
                                        {' '}
                                        09:00 - 18:00
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.text}>
                                        <Ionicons
                                            name="bus"
                                            size={15}
                                            color={colors.green}
                                        />{' '}
                                        {currentRegion?.distance} {strings.km}
                                    </Text>
                                </View>
                            </View>
                            <Seperator width={'95%'} />
                            <View style={styles.infoTextWrapper}>
                                <Text style={styles.infoText}>
                                    The quality of informational text can be
                                    judged in a variety of ways. For this award,
                                    we will examine the texts with an eye on the
                                    following categories. Accuracy of Content:
                                    Is the content timely, accurate and direct?
                                    Is this text likely to advance a young
                                    child’s world knowledge? Authority of
                                    Authorship: What are the qualifications of
                                    the author on this topic? Were collaborators
                                    consulted?
                                </Text>
                            </View>
                            <Seperator width={'95%'} />
                            <View style={styles.servicesWrapper}>
                                <ServiceItem
                                    text={strings.direction}
                                    icon="directions"
                                    onPress={onRoutePress}
                                />
                                <ServiceItem
                                    text={strings.showOnMap}
                                    icon="gps-fixed"
                                    onPress={() =>
                                        locationPress(_cardPanel.current)
                                    }
                                />
                                <ServiceItem
                                    text={strings.call}
                                    icon="call"
                                    onPress={callPress}
                                />
                                <ServiceItem
                                    text={strings.chat}
                                    icon="chat"
                                    onPress={onChatPress}
                                />
                            </View>
                            <Seperator width="95%" />
                            <View style={styles.buttonWrapper}>
                                <ActionButton
                                    text={strings.mobileBanking}
                                    image={images.logo}
                                    descText={strings.orderCardForFree}
                                    onPress={onBankingPress}
                                    big
                                    accentColor={colors.lightGreen}
                                />
                                <ActionButton
                                    text={strings.orderUzcard}
                                    image={images.uzcard}
                                    descText={strings.orderCardForFree}
                                    onPress={onBankingPress}
                                />
                                <ActionButton
                                    text={strings.orderHumo}
                                    image={images.humo}
                                    // image={images.visa}
                                    descText={strings.orderCardForFree}
                                    onPress={onBankingPress}
                                />
                                <ActionButton
                                    text={strings.orderVisa}
                                    image={images.visa}
                                    descText={strings.orderCardForFree}
                                    onPress={onBankingPress}
                                />
                                <ActionButton
                                    text={strings.callOperator}
                                    image={images.call}
                                    descText={currentRegion?.phone[0]}
                                    onPress={callPress}
                                    alignment
                                    accentColor={colors.lightGreen}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </Animated.View>
            </SlidingUpPanel>
        </View>
    );
};

const mapStateToProps = ({descState, listState, mapState}) => ({
    descVisibility: descState.descVisibility,
    currentRegion: descState.currentRegion,
    panelVisibility: listState.panelVisibility,
    myRegion: mapState.myRegion,
});

const mapDispatchToProps = (dispatch) => ({
    callPress: () => dispatch(callPress()),
    locationPress: (ref) => dispatch(locationPress(ref)),
    setDestinationCoords: (location) =>
        dispatch(setDestinationCoords(location)),
    setMapMode: (mode) => dispatch(setMapMode(mode)),
    // getDirections: (start, end) => dispatch(getDirections(start, end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Description);
