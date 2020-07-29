import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Platform,
    Animated,
} from 'react-native';
import Map from './Map';
import Service from '../../services/service';
import RoundButton from '../../component/common/RoundButton';
import Text from '../../component/common/Text';
import {strings} from '../../locales/strings';
import FilterItem from '../../component/common/FilterItem';
import {colors, CARD_WIDTH, SPACING_FOR_CARD_INSET} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MarkerCard from '../../component/common/MarkerCard';

const MapPage = () => {
    return (
        <View style={styles.container}>
            <Map />
        </View>
    );
};

export default MapPage;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});
