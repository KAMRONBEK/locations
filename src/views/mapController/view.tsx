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
import {FREE_MAP, MAP_WITH_SEARCH, MAP_WITH_CARD_INFO} from '../../constants';

const MapController = ({myRegion, init, displayDataList, mapMode}: any) => {
    // const pointSelected = useCallback((point) => {}, [_map]);

    let [searchOffset, setSearchOffset] = useState(0);
    let [listOffset, setListOffset] = useState(0);

    useEffect(() => {
        init();
        // animateToRegion();
    }, []);

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (mapMode == FREE_MAP) {
            console.log('freemap');
            setSearchOffset(-300);
            setListOffset(-300);
            Keyboard.dismiss();
        } else if (mapMode == MAP_WITH_SEARCH) {
            setSearchOffset(0);
            setListOffset(-300);
        } else if ((mapMode = MAP_WITH_CARD_INFO)) {
            setSearchOffset(0);
            setListOffset(0);
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
                <View
                    style={[
                        styles.bottom,
                        {
                            bottom: listOffset,
                        },
                    ]}>
                    <DraggableList />
                </View>
            </View>
        </View>
    );
};

const mapStateToProps = ({mapState}) => ({
    myRegion: mapState.myRegion,
    displayDataList: mapState.displayDataList,
    mapMode: mapState.mapMode,
});

const mapDispatchToProps = (dispatch: any) => ({
    init: () => dispatch(init()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapController);
