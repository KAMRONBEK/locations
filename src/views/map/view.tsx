import React, {useCallback, forwardRef, useEffect} from 'react';
import {View, LayoutAnimation} from 'react-native';
import styles from './styles';
import MapView from 'react-native-map-clustering';
import {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import {colors} from '../../constants';
import mapConfig from '../../configs/mapConfig';
import images from '../../assets/images';
import {hidePanel} from '../../redux/actions';

const Map = forwardRef(
    ({myRegion, displayDataList, panelVisibility}: any, ref) => {
        let branchMarkers = useCallback(() => {
            return (
                displayDataList &&
                displayDataList.map((region, index) => (
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
                        title={region.name}
                    />
                ))
            );
        }, [displayDataList]);

        const onMapPress = () => {
            hidePanel();
        };

        useEffect(() => {
            console.log(panelVisibility);
        }, [panelVisibility]);

        useEffect(() => {
            if (ref.current) {
                ref.current.fitToCoordinates(displayDataList, {
                    edgePadding: {
                        top: 20,
                        left: 20,
                        right: 20,
                        bottom: 20,
                    },
                    animated: true,
                });
            }
        }, [displayDataList]);

        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={myRegion}
                    style={styles.map}
                    showsUserLocation={true}
                    showsCompass={false}
                    animationEnabled={true}
                    clusteringEnabled={true}
                    radius={30}
                    customMapStyle={mapConfig}
                    layoutAnimationConf={LayoutAnimation.Presets.easeInEaseOut}
                    ref={ref}
                    showsBuildings={true}
                    clusterColor={colors.blue}
                    showsMyLocationButton={false}
                    onPress={() => onMapPress()}
                    onPanDrag={() => onMapPress()}>
                    {branchMarkers()}
                </MapView>
            </View>
        );
    },
);

const mapStateToProps = ({mapState, dragPanelState}: any) => ({
    myRegion: mapState.myRegion,
    displayDataList: mapState.displayDataList,
    panelVisibility: dragPanelState.panelVisibility,
});

const mapDispatchToProps = {
    hidePanel,
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(Map);
