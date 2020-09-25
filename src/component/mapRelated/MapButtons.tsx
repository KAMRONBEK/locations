import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {colors, BORDER_RADIUS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hideCallout, regionSelected, showList} from '../../redux/actions';
import {branchType, regionType} from '../../screens/map/Map';
import {focusRegion} from '../../redux/thunks';

interface mapButtonsProps {
    displayData: Array<branchType>;
    myRegion: regionType;
    showList: any;
    focusRegion: any;
}

const MapButtons = ({
    displayData,
    myRegion,
    showList,
    focusRegion,
}: mapButtonsProps) => {
    const onLocationPress = useCallback(() => {
        focusRegion();
    }, [myRegion]);

    const toggleList = () => {};

    return (
        <View style={styles.container}>
            {displayData.length > 0 && (
                <View
                    style={[
                        styles.markerWrapper,
                        {
                            marginRight: 10,
                        },
                    ]}>
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
        left: 0,
    },
    markerWrapper: {
        // position: 'absolute',
        alignSelf: 'flex-end',
        // top: -40,
        width: 40,
        height: 40,
        backgroundColor: colors.lightBlue,
        borderColor: colors.gray,
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    locationIcon: {
        padding: 8,
    },
});

const mapStateToProps = ({mapState}: any) => ({
    displayData: mapState.displayDataList,
    myRegion: mapState.myRegion,
});

const mapDispatchToProps = (dispatch: any) => ({
    focusRegion: () => dispatch(focusRegion()),
    showList: () => {
        console.log('list');
        dispatch(hideCallout());
        dispatch(showList());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapButtons);
