import React, {useEffect, useRef, useCallback} from 'react';
import {View, ScrollView, Keyboard} from 'react-native';
import {styles} from './styles';
import Map from '../map';
import Search from '../search';
import DraggableList from '../list/view';
import {connect} from 'react-redux';
import {init} from '../../redux/thunks/mapState';
import mapType from 'react-native-maps';
import SearchBar from '../../component/common/SearchBar';
import SlidingUpPanel from 'rn-sliding-up-panel';

const MapController = ({myRegion, init, displayDataList}: any) => {
    const _map = useRef<mapType>(null);
    const _scrollView = useRef<ScrollView>(null);
    const _draggablePanel = useRef<SlidingUpPanel>(null);

    const animateToRegion = useCallback(() => {
        if (_map.current) {
            _map.current.animateToRegion(myRegion, 1000);
        }
    }, [myRegion]);

    // const pointSelected = useCallback((point) => {}, [_map]);

    useEffect(() => {
        init();
        animateToRegion();
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                if (_draggablePanel.current) {
                    _draggablePanel.current.hide();
                }
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                if (_draggablePanel.current) {
                    _draggablePanel.current.show();
                }
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Map ref={_map} dragPanelRef={_draggablePanel} />
            <View style={styles.content}>
                <View style={styles.top}>
                    <Search />
                </View>
                <View style={styles.bottom}>
                    <DraggableList
                        ref={_draggablePanel}
                        listRef={_scrollView}
                        mapRef={_map}
                    />
                </View>
            </View>
        </View>
    );
};

const mapStateToProps = ({mapState}) => ({
    myRegion: mapState.myRegion,
    displayDataList: mapState.displayDataList,
});

const mapDispatchToProps = (dispatch: any) => ({
    init: () => dispatch(init()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapController);
