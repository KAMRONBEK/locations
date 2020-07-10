import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import mapConfig from '../../configs/mapConfig';
import images from '../../assets/images';

const Map = () => {
  const onLocationPress = () => {
    Geolocation.setRNConfiguration(config);
  };

  return (
    <>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        //   region={currentRegion}
        customMapStyle={mapConfig}></MapView>
      {/* <View style={styles.onMapContent}> */}
      <View style={styles.markerWrapper}>
        <TouchableOpacity>
          <Image style={styles.marker} source={images.marker} />
        </TouchableOpacity>
      </View>

      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: -1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  onMapContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 40,
  },
  markerWrapper: {
    bottom: 40,
    right: 40,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 4,
  },
  marker: {
    margin: 10,
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
export default Map;
