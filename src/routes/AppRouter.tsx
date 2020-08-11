import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SCREENS} from '../constants';
import {MapStack} from '../screens';
import MapController from '../views/mapController';

let Stack = createStackNavigator();

const AppRouter = () => {
    return (
        <View style={{flex: 1}}>
            <NavigationContainer>
                <Stack.Navigator headerMode="none">
                    {/* <Stack.Screen
                        name={SCREENS.mapStack}
                        component={MapStack}
                    /> */}
                    <Stack.Screen
                        name={SCREENS.map}
                        component={MapController}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};

export default AppRouter;
