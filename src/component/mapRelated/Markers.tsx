import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {branchType} from '../../screens/map/Map';
import {Marker} from 'react-native-maps';
import images from '../../assets/images';

const Markers = ({data}: any) => {
    console.log(data);
    return (
        data &&
        data.map((region: branchType, index: number) => (
            <Marker
                // onPress={(e) => onMarkerPress(e)}
                key={index}
                style={{
                    width: 15,
                    height: 15,
                }}
                tracksViewChanges={false}
                coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                }}
                icon={
                    region.type == 'branch'
                        ? images.branch
                        : region.type == 'atm'
                        ? images.atm
                        : images.bank
                }
                title={region.name}>
                {/* <Image source={images.branch} style={styles.marker} /> */}
            </Marker>
        ))
    );
};

const styles = StyleSheet.create({});

export default Markers;
