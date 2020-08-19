import React, {useRef, useEffect} from 'react';
import {
    View,
    Image,
    Text,
    Linking,
    TouchableOpacity,
    Platform,
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
} from '../../constants';
import images from '../../assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {callPress, locationPress} from '../../redux/thunks';
import {setDestinationCoords, mapPressed} from '../../redux/actions';
import {ScrollView} from 'react-native-gesture-handler';
import {strings} from '../../locales/strings';
import RectangleButton from '../../component/common/RectangleButton';
import dragPanelState from '../../redux/reducers/dragPanelState';

const Description = ({
    currentRegion,
    callPress,
    locationPress,
    setDestinationCoords,
    mapPressed,
    descVisibility,
    panelVisibility,
}) => {
    const _cardPanel = useRef<SlidingUpPanel>(null);

    const onRoutePress = () => {
        mapPressed(FREE_MAP);
        setDestinationCoords(currentRegion);
    };

    const onSharePress = () => {
        console.log('share');
        if (_cardPanel.current) {
            _cardPanel.current.hide();
        }
    };

    const onCallPress = () => {};

    useEffect(() => {
        _cardPanel.current.show();
    }, [currentRegion]);

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
        console.log(panelVisibility);

        if (!panelVisibility) {
            if (_cardPanel.current) {
                _cardPanel.current.hide();
            }
        }
    }, [panelVisibility]);

    return (
        <View style={styles.container}>
            <SlidingUpPanel
                ref={_cardPanel}
                draggableRange={{
                    top: DESC_HEIGHT,
                    bottom: 140,
                }}
                minimumVelocityThreshold={100}
                height={DESC_HEIGHT}
                snappingPoints={[140, DESC_HEIGHT]}
                allowMomentum={true}
                friction={0.3}
                // animatedValue={}
            >
                <View style={styles.content}>
                    <View style={styles.notch}>
                        <View
                            style={{
                                borderWidth: 2,
                                width: 40,
                                borderColor: colors.gray,
                                borderRadius: BORDER_RADIUS,
                            }}
                        />
                    </View>
                    <View style={styles.row}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            scrollEventThrottle={1}
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={CARD_WIDTH + 40}
                            snapToAlignment="center"
                            style={styles.scrollView}
                            contentInset={{
                                top: 0,
                                left: 20,
                                bottom: 0,
                                right: 20,
                            }}
                            contentContainerStyle={{
                                paddingHorizontal:
                                    Platform.OS === 'android' ? 20 : 0,
                            }}>
                            {imgs.map((image) => {
                                return (
                                    <Image
                                        style={styles.bannerImage}
                                        source={image}
                                    />
                                );
                            })}
                        </ScrollView>
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.title}>{currentRegion.name}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.text}>{currentRegion.address}</Text>
                    </View>
                    <View
                        style={[
                            styles.row,
                            {
                                justifyContent: 'space-around',
                            },
                        ]}>
                        <TouchableOpacity onPress={onRoutePress}>
                            <View style={styles.card}>
                                <Ionicons
                                    name="car-outline"
                                    size={20}
                                    color={colors.textLightGray}
                                />
                                <Text style={styles.text}>
                                    {currentRegion.distance} {strings.km}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.card}>
                            <Ionicons
                                name="alarm-outline"
                                size={20}
                                color={colors.textLightGray}
                            />
                            <Text style={styles.text}>9:00 - 18:00</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => locationPress(_cardPanel.current)}>
                            <View style={styles.card}>
                                <Ionicons
                                    name="share-social-outline"
                                    size={20}
                                    color={colors.textLightGray}
                                />
                                <Text style={styles.text}>{strings.share}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.column}>
                        <RectangleButton
                            onPress={callPress}
                            backColor={colors.lightBlue}
                            buttonText={strings.call}
                            buttonTextColor={colors.textLightGray}
                        />
                    </View>
                </View>
            </SlidingUpPanel>
        </View>
    );
};

const mapStateToProps = ({descState, dragPanelState}) => ({
    descVisibility: descState.descVisibility,
    currentRegion: descState.currentRegion,
    panelVisibility: dragPanelState.panelVisibility,
});

const mapDispatchToProps = (dispatch) => ({
    callPress: () => dispatch(callPress()),
    locationPress: (ref) => dispatch(locationPress(ref)),
    setDestinationCoords: (location) =>
        dispatch(setDestinationCoords(location)),
    mapPressed: (mode) => dispatch(mapPressed(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Description);
