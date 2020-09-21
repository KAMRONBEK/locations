import React, {useCallback, useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    BackHandler,
    Linking
} from 'react-native';
import images from '../../assets/images';
import {BORDER_RADIUS, colors, deviceWidth} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {strings} from '../../locales/strings';
import {connect} from 'react-redux';
import {markerPressed} from '../../redux/thunks';
import ImageViewer from 'react-native-image-zoom-viewer';
import {cardPressed} from '../../redux/thunks';
import moment from 'moment';
import SendIntentAndroid from 'react-native-send-intent';
import Tooltip from 'react-native-walkthrough-tooltip';
import Seperator from '../common/Seperator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {branchType} from '../../screens/map/Map';

interface listItemProps {
    item: branchType;
    index: number;
    cardPressed: any;
}

const ListItem = ({item, index, cardPressed}: listItemProps) => {
    // alarm-outline
    // business-outline
    //bus-outline

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
            }
        },
        {
            url:
                'https://wowslider.net/local-sliders/demo-10/data1/images/road220058.jpg'
        }
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

    let [currentTime, setCurrentTime] = useState(
        moment(new Date(), 'hh:mm:ss')
    );

    let [toolTipVis, setToolTipVis] = useState(false);

    const onBankingPress = async () => {
        try {
            let isInstalled = await SendIntentAndroid.isAppInstalled(
                'com.ipakyulibank.mobile'
            );
            if (isInstalled) {
                console.log('installed');
                let isOpen = await SendIntentAndroid.openApp(
                    'com.ipakyulibank.mobile',
                    {}
                );
            } else {
                Linking.canOpenURL(
                    'market://details?id=com.ipakyulibank.mobile'
                )
                    .then((supported) => {
                        if (supported) {
                            console.log('accepted');
                            return Linking.openURL(
                                'market://details?id=com.ipakyulibank.mobile'
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
                                marginBottom: -15
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
                useNativeDriver={true}
            />
        </Modal>
    );

    // let temp = (
    //     <TouchableOpacity onPress={onPress} style={styles.container}>
    //         <View style={styles.plain}>
    //             <View>
    //                 <TouchableOpacity onPress={() => setSliderVisible(true)}>
    //                     <Image style={styles.image} source={images.banner1} />
    //                 </TouchableOpacity>

    //                 <View style={{}}>
    //                     <Text
    //                         style={{
    //                             paddingTop: 10,
    //                         }}>
    //                         9:00-16:00{' '}
    //                     </Text>
    //                     <Text
    //                         style={{
    //                             color: currentTime.isBetween(
    //                                 moment('09:00:00', 'hh:mm:ss'),
    //                                 moment('16:00:00', 'hh:mm:ss'),
    //                             )
    //                                 ? colors.lightBlue
    //                                 : colors.pink,
    //                         }}>
    //                         {currentTime.isBetween(
    //                             moment('09:00:00', 'hh:mm:ss'),
    //                             moment('16:00:00', 'hh:mm:ss'),
    //                         )
    //                             ? strings.open
    //                             : strings.closed}
    //                     </Text>
    //                 </View>
    //             </View>
    //             <View
    //                 style={{
    //                     paddingLeft: 10,
    //                 }}>
    //                 <View
    //                     style={[
    //                         {
    //                             alignSelf: 'flex-start',
    //                             position: 'absolute',
    //                         },
    //                     ]}>
    //                     {index == 0 && (
    //                         <Text style={styles.accent}>
    //                             {strings.closestOne}
    //                         </Text>
    //                     )}
    //                 </View>
    //                 <View style={styles.row}>
    //                     <Ionicons
    //                         name="business-outline"
    //                         size={15}
    //                         color={colors.green}
    //                     />

    //                     <Text style={styles.title}>{item.name} </Text>
    //                 </View>
    //                 <View style={styles.row}>
    //                     <Ionicons
    //                         name="location-outline"
    //                         size={15}
    //                         color={colors.green}
    //                     />
    //                     <Text numberOfLines={2} style={styles.text}>
    //                         {item.address}
    //                     </Text>
    //                 </View>
    //                 {/* <View style={styles.row}>
    // 			<Ionicons
    // 				name="alarm-outline"
    // 				size={15}
    // 				color={colors.green}
    // 			/>
    // 			<Text style={styles.text}>9:00 - 16:00</Text>
    // 		</View> */}
    //                 <View style={styles.row}>
    //                     <Ionicons
    //                         name="wallet-outline"
    //                         size={15}
    //                         color={colors.green}
    //                     />
    //                     <Text style={styles.text}>{item.type}</Text>
    //                 </View>
    //                 <View style={styles.row}>
    //                     <Ionicons
    //                         name="bus-outline"
    //                         size={15}
    //                         color={colors.green}
    //                     />
    //                     <Text style={styles.text}>
    //                         {item.distance} {strings.km}{' '}
    //                     </Text>
    //                 </View>
    //             </View>
    //         </View>
    //         <View
    //             style={[
    //                 styles.row,
    //                 {
    //                     paddingTop: 10,
    //                     justifyContent: 'space-evenly',
    //                 },
    //             ]}>
    //             {item.phone.map((number) => (
    //                 <TouchableOpacity
    //                     onPress={() => Linking.openURL(`tel:${number}`)}>
    //                     <View
    //                         style={{
    //                             flexDirection: 'row',
    //                             justifyContent: 'center',
    //                             alignItems: 'center',
    //                             borderRadius: BORDER_RADIUS,
    //                             padding: 5,
    //                             backgroundColor: colors.lightPink,
    //                             paddingHorizontal: 10,
    //                         }}>
    //                         <Text
    //                             style={{
    //                                 fontSize: 16,
    //                                 color: colors.darkBlack,
    //                                 maxWidth: deviceWidth * 0.5,
    //                                 paddingRight: 15,
    //                             }}>
    //                             {number}
    //                         </Text>
    //                         <Ionicons
    //                             name="call-outline"
    //                             size={20}
    //                             color={colors.green}
    //                         />
    //                     </View>
    //                 </TouchableOpacity>
    //             ))}
    //         </View>
    //         <TouchableOpacity onPress={onBankingPress}>
    //             <View
    //                 style={{
    //                     flexDirection: 'row',
    //                     alignSelf: 'center',
    //                     alignItems: 'center',
    //                 }}>
    //                 <Image style={styles.bankingImg} source={images.banking} />
    //                 <Text> INTERNET BANKING</Text>
    //             </View>
    //         </TouchableOpacity>
    //     </TouchableOpacity>
    // );

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
                            : colors.violate
                }
            ]}>
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => setSliderVisible(true)}>
                        <Image style={styles.image} source={images.banner1} />
                        {imageModal()}
                        <View style={styles.lupaWrapper}>
                            <Ionicons
                                name="search-outline"
                                size={60}
                                color={'rgba(255,255,255,0.3)'}
                            />
                        </View>
                    </TouchableOpacity>

                    <Tooltip
                        isVisible={toolTipVis}
                        backgroundColor={'rgba(0,0,0,0.7)'}
                        content={
                            <View style={{flex: 1}}>
                                {currentTime.isBetween(
                                    moment('09:00:00', 'hh:mm:ss'),
                                    moment('16:00:00', 'hh:mm:ss')
                                ) ? (
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: colors.gray
                                        }}>
                                        {Math.round(
                                            moment
                                                .duration(
                                                    currentTime.diff(
                                                        moment(
                                                            '09:00:00',
                                                            'hh:mm:ss'
                                                        )
                                                    )
                                                )
                                                .asMinutes()
                                        )}{' '}
                                        {strings.min} {strings.closesAfter}
                                    </Text>
                                ) : (
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: colors.gray
                                        }}>
                                        ' (' + `$
                                        {Math.round(
                                            moment
                                                .duration(
                                                    currentTime.diff(
                                                        moment(
                                                            '09:00:00',
                                                            'hh:mm:ss'
                                                        )
                                                    )
                                                )
                                                .asMinutes()
                                        )}{' '}
                                        ${strings.min} ${strings.opensAfter})`
                                    </Text>
                                )}
                            </View>
                        }
                        placement="right"
                        onClose={() => setToolTipVis(false)}>
                        <TouchableOpacity onPress={() => setToolTipVis(true)}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingTop: 5
                                }}>
                                <Text
                                    style={{
                                        color: colors.textGray,
                                        textAlign: 'center',
                                        textTransform: 'capitalize'
                                    }}>
                                    {currentTime.isBetween(
                                        moment('09:00:00', 'hh:mm:ss'),
                                        moment('16:00:00', 'hh:mm:ss')
                                    )
                                        ? strings.open
                                        : strings.opensAt}
                                </Text>
                                <Ionicons
                                    name="information-circle"
                                    size={15}
                                    color={colors.blue}
                                />
                            </View>
                        </TouchableOpacity>
                    </Tooltip>
                </View>
                <View style={styles.content}>
                    <View style={styles.titleWrapper}>
                        <Text
                            numberOfLines={2}
                            style={[
                                styles.title,
                                index == 0 && {
                                    width: deviceWidth * 0.6 - 80
                                }
                            ]}>
                            <View
                                style={[
                                    styles.typeWrapper,
                                    {
                                        backgroundColor:
                                            item.type == 'atm'
                                                ? colors.pinkTrans
                                                : item.type == 'branch'
                                                ? colors.redTrans
                                                : colors.violateTrans
                                    }
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
                                                    : colors.violate
                                        }
                                    ]}>
                                    {item.type == 'atm'
                                        ? strings.atm
                                        : item.type == 'branch'
                                        ? strings.branches
                                        : strings.minibanks}
                                </Text>
                            </View>
                            {item.name}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Ionicons
                            name="location"
                            size={12}
                            color={colors.green}
                            style={{
                                paddingTop: 2
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
                                paddingTop: 2
                            }}
                        />
                        <Text numberOfLines={2} style={styles.text}>
                            {' '}
                            9:00 - 18:00 Пн, Вт, Ср, Чт, Пт
                        </Text>
                    </View>
                    <Seperator width="90%" />
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={onBankingPress}>
                            <View style={styles.transferWrapper}>
                                <View
                                    style={{
                                        backgroundColor: colors.lightGreen,
                                        borderRadius: 40,
                                        padding: 5,
                                        marginLeft: -18,
                                        paddingLeft: 20
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
                                flexDirection: 'row'
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
        marginBottom: 10
    },
    container: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: BORDER_RADIUS,
        // paddingVertical: 40
        padding: 8,
        flex: 1
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start'
        // justifyContent: 'flex-start',
    },
    row: {
        marginBottom: 3,
        flexDirection: 'row'
        // alignItems: 'baseline',
    },
    image: {
        height: 90,
        width: 100,
        borderRadius: BORDER_RADIUS,
        marginRight: 10,
        resizeMode: 'cover'
    },
    title: {
        width: deviceWidth * 0.4,
        fontSize: 14,
        color: colors.green,
        textTransform: 'capitalize',
        paddingLeft: 5
    },
    text: {
        fontSize: 12,
        color: colors.darkBlack,
        maxWidth: deviceWidth * 0.5
    },
    accent: {
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic',
        position: 'absolute',
        top: 0,
        right: 5
    },
    bankingImg: {
        width: 35,
        height: 35
    },
    typeWrapper: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    type: {
        fontSize: 12,
        textTransform: 'capitalize'
    },
    content: {
        justifyContent: 'space-between',
        // paddingVertical: 10,
        flex: 1
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        position: 'absolute',
        left: 20,
        top: 20
    }
});

const mapStateToProps = ({}: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
    cardPressed: (region: branchType) => dispatch(cardPressed(region))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
