import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SCREENS} from '../../constants';
import MapPage from './MapPage';

let Stack = createStackNavigator();

export const MapStack = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name={SCREENS.map} component={MapPage} />
        </Stack.Navigator>
    );
};
