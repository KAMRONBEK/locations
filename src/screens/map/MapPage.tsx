import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Map from './Map';
import Service from '../../services/service';

const MapPage = () => {
    return (
        <View style={styles.container}>
            <Map />
            <View style={styles.content}>
                <Text></Text>
            </View>
        </View>
    );
};

export default MapPage;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {},
});
