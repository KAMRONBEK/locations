import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MapView from './MapView';
import {SCREENS} from '../../constants';

let Stack = createStackNavigator();

export const MapStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={SCREENS.map} component={MapView} />
    </Stack.Navigator>
  );
};
