import React, {useEffect, useState, useCallback} from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    View,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    NativeModules,
} from 'react-native';
import {connect} from 'react-redux';
import {
    colors,
    BORDER_RADIUS,
    SCREENS,
    UZ,
    RU,
    ENG,
    deviceWidth,
} from '../../constants';
import {toggleMenu} from '../../redux/actions';
import {SafeAreaView} from 'react-native-safe-area-context';
// import DrawerItem from './DrawerItem';
import {strings} from '../../locales/strings';
// import {navigate} from '../../utils/NavigationService';
// import FlashMessage from '../common/FlashMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Buble from './Buble';
import appState from '../../redux/reducers/appState';
import DrawerItem from './DrawerItem';
import {navigate} from '../../services/navigationServices';
import Text from '../../component/common/Text';

type DrawerProps = {
    children: any;
    menuOpen: boolean;
    toggleMenu: Function;
    navigation: any;
};

let {width} = Dimensions.get('window');

const CustomDrawer = ({
    children,
    menuOpen,
    toggleMenu,
    navigation,
    originalDataList,
    language,
}: DrawerProps) => {
    const [animation, setAnimation] = useState(new Animated.Value(0));
    //changing height while keyboard is on

    //end of keyboard handling

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        forceUpdate();
    }, [language]);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: Number(menuOpen),
            useNativeDriver: true,
        }).start();
    }, [menuOpen]);
    let scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.7],
    });
    let translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width - 20],
    });
    let borderRadius = animation.interpolate({
        inputRange: [0, 0.1, 1],
        outputRange: [0, 40, 40],
    });
    return (
        <View style={styles.plane}>
            <View style={[styles.drawerContainer]}>
                <View>
                    <View style={styles.avatarContainer}>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <Image
                                source={{
                                    uri:
                                        'https://docs.snapchat.com/images/docs/design-guidelines/black-background@2x.png',
                                }}
                                style={styles.avatar}
                            />
                            <View
                                style={[
                                    styles.column,
                                    {
                                        paddingHorizontal: 20,
                                    },
                                ]}>
                                <Text style={styles.username}>Kamuran</Text>
                                <Text style={styles.id}>
                                    ID:{' '}
                                    <Text style={{color: colors.lightBlue}}>
                                        009
                                    </Text>
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={toggleMenu}>
                            <View style={styles.closeWrapper}>
                                <Ionicons
                                    name="close-outline"
                                    size={35}
                                    color={colors.pink}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={[
                            styles.row,
                            {
                                width: deviceWidth * 0.7,
                            },
                        ]}>
                        <Buble state={UZ} />
                        <Buble state={RU} />
                        <Buble state={ENG} />
                    </View>
                </View>
                <View
                    style={{
                        marginTop: -30,
                    }}>
                    <DrawerItem
                        onPress={() => {
                            navigate(SCREENS.home, {});
                            toggleMenu();
                        }}
                        iconName={'ios-home-outline'}
                        text={strings.home}
                        size={27}
                    />
                    <DrawerItem
                        onPress={() => {
                            toggleMenu();
                        }}
                        iconName={'person-outline'}
                        text={strings.profile}
                        size={27}
                    />
                    <DrawerItem
                        onPress={() => {
                            toggleMenu();
                        }}
                        iconName={'globe-outline'}
                        text={strings.places}
                    />
                    <DrawerItem
                        onPress={() => {
                            toggleMenu();
                        }}
                        iconName={'chatbubble-ellipses-outline'}
                        text={strings.CallCenter}
                    />
                </View>
                <View>
                    <Text>
                        <Text style={styles.normalLight}>
                            {strings.allDataCount}
                            {': '}
                        </Text>
                        <Text style={styles.normalBold}>
                            {originalDataList.length}
                        </Text>
                    </Text>
                    <View style={styles.logout}>
                        <DrawerItem
                            text={strings.logout}
                            iconName={'power-outline'}
                            hasBorder={false}
                        />
                        {/*  <Text
                            style={{
                                ...styles.normalLight,
                                fontSize: 13,
                                textAlignVertical: 'center',
                            }}>{`${
                            strings.version
                        } ${VersionCheck.getCurrentVersion()} (${VersionCheck.getCurrentBuildNumber()})`}</Text> */}
                    </View>
                </View>
            </View>
            <Animated.View
                pointerEvents={menuOpen ? 'none' : 'auto'}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius,
                    transform: [{scale}, {translateX}],
                }}>
                {children}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    plane: {
        backgroundColor: colors.ultraLightBlue,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    drawerContainer: {
        position: 'absolute',
        top: 30,
        right: 20,
        left: 20,
        bottom: 0,
        justifyContent: 'space-between',
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: BORDER_RADIUS,
        borderWidth: 1,
        borderColor: colors.lightPink,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 24,
        color: colors.darkBlack,
        marginTop: 10,
    },
    id: {
        fontWeight: '300',
        fontSize: 17,
        color: colors.dimGray,
        marginTop: 10,
    },
    normalBold: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.lightBlue,
    },
    normalLight: {
        fontSize: 17,
        fontWeight: '300',
        color: colors.black,
    },
    borderedRegular: {
        fontSize: 17,
        color: colors.darkBlack,
        borderBottomWidth: 1,
        borderColor: colors.white,
        // borderStyle: "dotted",
        marginLeft: 15,
        textDecorationStyle: 'dashed',
        textDecorationLine: 'underline',
    },
    logout: {
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    closeWrapper: {
        padding: 15,
    },
});

const mapStateToProps = ({appState, mapState}) => ({
    menuOpen: appState.menuOpen,
    originalDataList: mapState.originalDataList,
    language: appState.language,
});

const mapDispatchToProps = {
    toggleMenu,
};

const ConnectedCustomDrawer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomDrawer);

export default ConnectedCustomDrawer;
