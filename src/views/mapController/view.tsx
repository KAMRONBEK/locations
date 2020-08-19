import React, {useEffect, useRef, useCallback, useState} from 'react';
import {View, ScrollView, Keyboard, LayoutAnimation} from 'react-native';
import {styles} from './styles';
import Map from '../map';
import Search from '../search';
import DraggableList from '../list/view';
import {connect} from 'react-redux';
import {init} from '../../redux/thunks/mapState';
import mapType from 'react-native-maps';
import SearchBar from '../../component/common/SearchBar';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {
    FREE_MAP,
    MAP_WITH_SEARCH,
    MAP_WITH_CARD_INFO,
    MAP_WITH_DESC,
} from '../../constants';
import Description from '../description';

const MapController = ({init, mapMode, descVisibility, descRegion}: any) => {
    let [searchOffset, setSearchOffset] = useState(0);
    let [listOffset, setListOffset] = useState(0);
    let [descOffset, setDescOffset] = useState(-400);

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (mapMode == FREE_MAP) {
            console.log('freemap');
            setSearchOffset(-300);
            setDescOffset(-400);
            setListOffset(-300);
            Keyboard.dismiss();
        } else if (mapMode == MAP_WITH_SEARCH) {
            setSearchOffset(0);
            setListOffset(-300);
            setDescOffset(-400);
        } else if (mapMode == MAP_WITH_CARD_INFO) {
            setSearchOffset(0);
            setDescOffset(-400);
            setListOffset(0);
        } else if (mapMode == MAP_WITH_DESC) {
            setListOffset(-400);
            setDescOffset(0);
        }
    }, [mapMode]);

    // useEffect(() => {
    //     const keyboardDidShowListener = Keyboard.addListener(
    //         'keyboardDidShow',
    //         () => {
    //             if (_draggablePanel.current) {
    //                 _draggablePanel.current.hide();
    //             }
    //         },
    //     );
    //     const keyboardDidHideListener = Keyboard.addListener(
    //         'keyboardDidHide',
    //         () => {
    //             if (_draggablePanel.current) {
    //                 _draggablePanel.current.show();
    //             }
    //         },
    //     );

    //     return () => {
    //         keyboardDidHideListener.remove();
    //         keyboardDidShowListener.remove();
    //     };
    // }, []);

    return (
        <View style={styles.container}>
            <Map />
            <View style={styles.content}>
                <View
                    style={[
                        styles.top,
                        {
                            top: searchOffset,
                        },
                    ]}>
                    <Search />
                </View>
                <View style={[styles.bottom]}>
                    <View
                        style={{
                            bottom: listOffset,
                        }}>
                        <DraggableList />
                    </View>
                    <View
                        style={{
                            bottom: descOffset,
                        }}>
                        {descRegion && <Description />}
                    </View>
                </View>
            </View>
        </View>
    );
};

const mapStateToProps = ({mapState, descState}) => ({
    myRegion: mapState.myRegion,
    displayDataList: mapState.displayDataList,
    mapMode: mapState.mapMode,
    descVisibility: descState.descVisibility,
    descRegion: descState.currentRegion,
});

const mapDispatchToProps = (dispatch: any) => ({
    init: () => dispatch(init()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapController);
