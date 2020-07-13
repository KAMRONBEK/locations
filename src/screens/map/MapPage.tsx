import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Map from './Map';
import Service from '../../services/service';
import RoundButton from '../../component/RoundButton';

const MapPage = () => {
    return (
        <View style={styles.container}>
            <Map />
            <View style={styles.content}>
                <RoundButton text={'asd'} backgoundColor={'#ccc'} />
                <Text
                    style={{
                        fontFamily: 'Iowan Old Style',
                    }}>
                    Custom Font
                </Text>
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
