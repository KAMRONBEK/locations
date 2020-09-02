import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {colors, BORDER_RADIUS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {regionSelected, showList} from '../../redux/actions';

const MapButtons = ({displayData, myRegion, regionSelected, showList}) => {
    const onLocationPress = useCallback(() => {
        regionSelected(myRegion);
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

const mapStateToProps = ({mapState}) => ({
    displayData: mapState.displayDataList,
    myRegion: mapState.myRegion,
});

const mapDispatchToProps = (dispatch) => ({
    regionSelected: (location) => dispatch(regionSelected(location)),
    showList: () => dispatch(showList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapButtons);
