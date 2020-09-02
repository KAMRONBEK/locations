import React, {useEffect} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import images from '../../assets/images';
import {strings} from '../../locales/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, UZ, RU, ENG, SCREENS} from '../../constants';
import {connect} from 'react-redux';
import {setLanguage, hideList} from '../../redux/actions';
import RNPickerSelect from 'react-native-picker-select';
import {navigate} from '../../services/navigationServices';

let languages = [
    {
        image: images.uz,
        value: UZ,
        label: UZ,
    },
    {
        image: images.ru,
        value: RU,
        label: RU,
    },
    {
        image: images.eng,
        value: ENG,
        label: ENG,
    },
];

let Home = ({navigation, language, setLanguage, hideList}) => {
    useEffect(() => {
        hideList();
    }, [navigation]);

    useEffect(() => {
        console.log(language);
    }, [languages]);

    const onMapPress = () => {
        navigate(SCREENS.map, {});
    };
    const onListPress = () => {
        navigate(SCREENS.map, {
            action: 'list',
        });
    };

    const onSearchPress = () => {
        navigate(SCREENS.map, {
            action: 'search',
        });
    };

    const onLocationPress = () => {
        navigate(SCREENS.map, {
            action: 'location',
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image source={images.logo} style={styles.logo} />
                <View style={styles.titleWrapper}>
                    <Text style={styles.name}>Ipak Yoli Locator</Text>
                    <Text style={styles.decText}>ipakyulibank.uz</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.descWrapper}>
                    <Text style={styles.title}>
                        Ipak Yoli Locator -{' '}
                        <Text style={styles.descText}>{strings.appDesc}</Text>
                    </Text>
                </View>
                <View style={styles.boxWrapper}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={onMapPress}>
                            <View style={styles.card}>
                                <Ionicons
                                    name="map-outline"
                                    size={30}
                                    color={colors.green}
                                />
                                <Text style={styles.text}>
                                    {strings.allLocation} {strings.onMap}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onListPress}>
                            <View style={styles.card}>
                                <Ionicons
                                    name="list-outline"
                                    size={30}
                                    color={colors.green}
                                />
                                <Text style={styles.text}>
                                    {strings.allLocation} {strings.inList}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity onPress={onSearchPress}>
                            <View style={styles.card}>
                                <Ionicons
                                    name="ios-search-outline"
                                    size={30}
                                    color={colors.green}
                                />
                                <Text style={styles.text}>
                                    {strings.search}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onLocationPress}>
                            <View style={styles.card}>
                                <Ionicons
                                    name="ios-locate-outline"
                                    size={30}
                                    color={colors.green}
                                />
                                <Text style={styles.text}>
                                    {strings.myLocation}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <RNPickerSelect
                    placeholder={{}}
                    onValueChange={(value) => {
                        strings.setLanguage(value);
                        setLanguage(value);
                    }}
                    items={languages}>
                    <View style={styles.round}>
                        <Text style={styles.roundText}>{language}</Text>
                        <Image
                            source={
                                language == UZ
                                    ? images.uz
                                    : language == RU
                                    ? images.ru
                                    : images.eng
                            }
                            style={styles.languageImg}
                        />
                    </View>
                </RNPickerSelect>
            </View>
        </View>
    );
};

const mapStateToProps = ({appState}) => ({
    language: appState.language,
});

const mapDispatchToProps = (dispatch) => ({
    setLanguage: (language) => dispatch(setLanguage(language)),
    hideList: () => dispatch(hideList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
