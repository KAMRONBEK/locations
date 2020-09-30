/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, Platform, UIManager} from 'react-native';
import AppRouter from './src/routes/AppRouter';
import {Provider} from 'react-redux';
import configureStore from './src/redux/configureStore';
import LoadingModal from './src/component/container/LoadingModal';
import SplashScreen from 'react-native-splash-screen';
import {colors} from './src/constants';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const App = () => {
    console.disableYellowBox = true;
    useEffect(() => {
        SplashScreen.hide();
    }, []);
    let store = configureStore();
    return (
        <>
            <StatusBar
                backgroundColor={colors.white}
                barStyle="dark-content"
                translucent={true}
            />
            {/* <SafeAreaView */}
            {/* // forceInset={{top: 'always'}} */}
            {/* style={{backgroundColor: 'transparent', flex: 1}}> */}
            <Provider store={store}>
                <AppRouter />
                <LoadingModal />
            </Provider>
            {/* </SafeAreaView> */}
        </>
    );
};

export default App;
