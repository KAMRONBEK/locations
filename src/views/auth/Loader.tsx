import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, deviceWidth, SCREENS} from '../../constants';
import LottieView from 'lottie-react-native';
import lotties from '../../assets/lotties';
import images from '../../assets/images';
import AsyncStorage from '@react-native-community/async-storage';
import {setLanguage} from '../../redux/actions';
import {connect} from 'react-redux';
import {NavigationProp} from '@react-navigation/native';
import {navigate} from '../../services/navigationServices';
import {strings} from '../../locales/strings';

interface loaderProps {
    navigation: NavigationProp<{}>;
    setLanguage: any;
}

const Loader = ({navigation, setLanguage}: loaderProps) => {
    const loadUp = async () => {
        try {
            let storageLanguage = await AsyncStorage.getItem('@language');
            if (!!storageLanguage) {
                let language = JSON.parse(storageLanguage);
                console.log(language, 'in storage');
                setLanguage(language);
                strings.setLanguage(language);
                navigate(SCREENS.home, {});
            } else {
                console.log('no language in storage');
                navigate(SCREENS.home, {});
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadUp();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={images.logo} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        position: 'absolute',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: deviceWidth / 1.5,
        resizeMode: 'contain',
    },
});

const mapStateToProps = ({}: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
    setLanguage: (language: string) => dispatch(setLanguage(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
