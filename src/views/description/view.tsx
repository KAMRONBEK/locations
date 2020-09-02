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
        outputRange: [colors.lightPink, colors.ultraLightBlue],
    });
    let borderRadius = animatedValue.interpolate({
        inputRange: [140, deviceHeightW],
        outputRange: [BORDER_RADIUS, 0],
    });
    let notchVisibility = animatedValue.interpolate({
        inputRange: [140, deviceHeightW],
        outputRange: [1, 0],
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

    let temp = {
        address: '"210100, г. Навои, 17-б микрорайон, Торговый центр 104"',
        branch_id: '15',
        id: '8',
        latitude: 40.0378710583984,
        location: '40.0378710583984,64.8445473718512',
        longitude: 64.8445473718512,
        name: 'ЭЦ "Кизилтепа"',
        phone: ['79-226-09-93'],
        tag:
            'minibank ЭЦ "Кизилтепа" "210100, г. Навои, 17-б микрорайон, Торговый центр 104" minibank ',
        trial516: 'T',
        type: 'minibank',
        distance: 123.212,
    };

    let imgs = [images.banner1, images.banner2, images.banner3];

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [descVisibility]);

    return (
        <>
            {descVisibility ? (
                <View style={styles.container}>
                    <SlidingUpPanel
                        ref={_cardPanel}
                        draggableRange={{
                            top: DESC_HEIGHT,
                            bottom: 145,
                        }}
                        minimumVelocityThreshold={100}
                        height={DESC_HEIGHT}
                        snappingPoints={[140]}
                        allowMomentum={true}
                        friction={0.1}
                        minimumDistanceThreshold={30}
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
                            </Animated.View>
                            <ScrollView
                                onTouchStart={() => setAllowDragging(false)}
                                onTouchEnd={() => setAllowDragging(true)}
                                onTouchCancel={() => setAllowDragging(true)}>
                                <View style={styles.column}>
                                    <Text style={styles.title}>
                                        {currentRegion?.name}
                                    </Text>
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.text}>
                                        {currentRegion?.address}
                                    </Text>
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.text}>
                                        {currentRegion?.type}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.row,
                                        {
                                            justifyContent: 'space-around',
                                        },
                                    ]}>
                                    <TouchableOpacity onPress={onRoutePress}>
                                        <Animated.View style={[styles.card]}>
                                            <Ionicons
                                                name="car-outline"
                                                size={20}
                                                color={colors.green}
                                            />
                                            <Text style={styles.text}>
                                                {currentRegion?.distance}{' '}
                                                {strings.km}
                                            </Text>
                                        </Animated.View>
                                    </TouchableOpacity>
                                    <View style={styles.card}>
                                        <Ionicons
                                            name="alarm-outline"
                                            size={20}
                                            color={colors.green}
                                        />
                                        <Text style={styles.text}>
                                            9:00 - 18:00
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            locationPress(_cardPanel.current)
                                        }>
                                        <View style={styles.card}>
                                            <Ionicons
                                                name="share-social-outline"
                                                size={20}
                                                color={colors.green}
                                            />
                                            <Text style={styles.text}>
                                                {strings.share}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={[
                                        styles.row,
                                        {
                                            justifyContent: 'space-evenly',
                                        },
                                    ]}>
                                    <TouchableOpacity onPress={onChatPress}>
                                        <View style={styles.card}>
                                            <Ionicons
                                                name="chatbubble-ellipses-outline"
                                                size={20}
                                                color={colors.green}
                                            />
                                            <Text style={styles.text}>
                                                {strings.sendMessage}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={onSavePress}>
                                        <View style={styles.card}>
                                            <Ionicons
                                                name="ios-save-outline"
                                                size={20}
                                                color={colors.green}
                                            />
                                            <Text style={styles.text}>
                                                {strings.save}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={[
                                        styles.column,
                                        {
                                            // paddingTop: 200,
                                        },
                                    ]}>
                                    <RectangleButton
                                        onPress={callPress}
                                        backColor={colors.lightBlue}
                                        buttonText={strings.call}
                                        buttonTextColor={colors.textLightGray}
                                    />
                                </View>
                            </ScrollView>
                        </Animated.View>
                    </SlidingUpPanel>
                </View>
            ) : null}
        </>
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
