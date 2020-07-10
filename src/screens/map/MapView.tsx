import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Map from './Map';

const MapView = () => {
  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.content}>
		  
	  </View>
    </View>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {},
});
