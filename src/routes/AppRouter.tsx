import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SCREENS} from '../constants';
import {MapStack} from '../screens';
import MapController from '../views/mapController';
import CustomDrawer from '../component/drawer/CustomDrawer';
import Chat from '../views/chat';
import Home from '../views/home';
import {navigationRef} from '../services/navigationServices';

let Stack = createStackNavigator();

const AppRouter = () => {
    return (
        <View style={{flex: 1}}>
            <NavigationContainer ref={navigationRef}>
                <CustomDrawer>
                    <Stack.Navigator headerMode="none">
                        {/* <Stack.Screen name={SCREENS.mapStack} component={MapStack} /> */}
                        <Stack.Screen name={SCREENS.home} component={Home} />

                        <Stack.Screen
                            name={SCREENS.map}
                            component={MapController}
                        />
                        <Stack.Screen name={SCREENS.chat} component={Chat} />
                    </Stack.Navigator>
                </CustomDrawer>
            </NavigationContainer>
        </View>
    );
};

export default AppRouter;
