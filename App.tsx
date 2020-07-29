/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {SafeAreaView, StatusBar, Platform, UIManager} from 'react-native';
import AppRouter from './src/routes/AppRouter';
import {Provider} from 'react-redux';
import configureStore from './src/redux/configureStore';
import LoadingModal from './src/component/container/LoadingModal';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const App = () => {
    console.disableYellowBox = true;

    let store = configureStore();
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={'white'} />
            <SafeAreaView style={{flex: 1}}>
                <Provider store={store}>
                    <AppRouter />
                    <LoadingModal />
                </Provider>
            </SafeAreaView>
        </>
    );
};

export default App;
