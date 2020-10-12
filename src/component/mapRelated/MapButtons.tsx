import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {colors, BORDER_RADIUS, standard} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    hideCallout,
    regionSelected,
    showList,
    toggleMapType
} from '../../redux/actions';
import {branchType, regionType} from '../../screens/map/Map';
import {focusRegion} from '../../redux/thunks';

interface mapButtonsProps {
    displayData: Array<branchType>;
    myRegion: regionType;
    showList: any;
    focusRegion: any;
    mapType: string;
    toggleMapType: any;
    zoomLevel: number;
}

const MapButtons = ({
    displayData,
    myRegion,
    showList,
    focusRegion,
    mapType,
    toggleMapType,
    zoomLevel
}: mapButtonsProps) => {
    const onLocationPress = useCallback(() => {
        focusRegion();
    }, [myRegion]);

    const onSatellitePress = () => {
        toggleMapType();
    };

    const toggleList = () => {};

    return (
        <View style={styles.container}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text
                    style={{
                        color:
                            mapType == standard
                                ? colors.lightDark
                                : colors.ultraLightBlue,
                        fontSize: 20
                    }}>
                    {zoomLevel}
                </Text>
            </View>

            <View style={styles.markerWrapper}>
                <TouchableOpacity onPress={onSatellitePress}>
                    <View style={styles.locationIcon}>
                        <MaterialCommunityIcons
                            name={
                                mapType == standard
                                    ? 'satellite-uplink'
                                    : 'map-outline'
                            }
                            size={24}
                            color={colors.white}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {displayData.length > 0 && (
                <View style={[styles.markerWrapper]}>
                    <TouchableOpacity onPress={showList}>
                        <View style={styles.locationIcon}>
                            <Ionicons
                                name="md-list-outline"
                                size={24}
                                color={colors.white}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.markerWrapper}>
                <TouchableOpacity onPress={onLocationPress}>
                    <View style={styles.locationIcon}>
                        <Ionicons
                            name="locate-outline"
                            size={24}
                            color={colors.white}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        right: 0,
        left: 0
    },
    markerWrapper: {
        // position: 'absolute',
        alignSelf: 'flex-end',
        // top: -40,
        width: 40,
        height: 40,
        backgroundColor: colors.dimGreen,
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginLeft: 10
    },
    locationIcon: {
        padding: 8
    }
});

const mapStateToProps = ({mapState}: any) => ({
    displayData: mapState.displayDataList,
    myRegion: mapState.myRegion,
    mapType: mapState.mapType,
    zoomLevel: mapState.zoomLevel
});

const mapDispatchToProps = (dispatch: any) => ({
    focusRegion: () => dispatch(focusRegion()),
    showList: () => {
        console.log('list');
        dispatch(hideCallout());
        dispatch(showList());
    },
    toggleMapType: () => dispatch(toggleMapType())
});

export default connect(mapStateToProps, mapDispatchToProps)(MapButtons);
