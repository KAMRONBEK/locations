import React, {useEffect, useRef, useCallback, useState} from 'react';
import {View, ScrollView, Keyboard, LayoutAnimation} from 'react-native';
import {styles} from './styles';
import Map from '../map';
import Search from '../search';
import List from '../list/view';
import {connect} from 'react-redux';
import {init} from '../../redux/thunks/mapState';
import mapType from 'react-native-maps';
import SearchBar from '../../component/common/SearchBar';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {
    FREE_MAP,
    MAP_WITH_SEARCH,
    MAP_WITH_LIST,
    MAP_WITH_DESC,
} from '../../constants';
import Description from '../description';
import {strings} from '../../locales/strings';
import MapButtons from '../../component/mapRelated/MapButtons';
import {
    showList,
    hideList,
    setSearchFocus,
    regionSelected,
} from '../../redux/actions';

const MapController = ({
    init,
    mapMode,
    descVisibility,
    currentRegion,
    language,
    route,
    showList,
    hideList,
    setSearchFocus,
    regionSelected,
    myRegion,
}: any) => {
    useEffect(() => {
        setImmediate(() => hideList());
        init();
        console.log(route.params.action);
        switch (route.params.action) {
            case 'list': {
                setTimeout(() => {
                    showList();
                }, 100);
                return;
            }
            case 'search': {
                setSearchFocus(true);
                return;
            }
            case 'location': {
                {
                    setTimeout(() => {
                        regionSelected(myRegion);
                    }, 400);
                    return;
                }
            }
            default:
                return;
        }
    }, [language]);

    return (
        <View style={styles.container}>
            <Map />
            <View style={styles.content}>
                <Search />
                <View>
                    <MapButtons />
                    <Description />
                </View>
            </View>
            <List />
        </View>
    );
};

const mapStateToProps = ({mapState, descState, appState}) => ({
    myRegion: mapState.myRegion,
    displayDataList: mapState.displayDataList,
    mapMode: mapState.mapMode,
    descVisibility: descState.descVisibility,
    currentRegion: descState.currentRegion,
    language: appState.language,
});

const mapDispatchToProps = (dispatch: any) => ({
    init: () => dispatch(init()),
    showList: () => dispatch(showList()),
    hideList: () => dispatch(hideList()),
    setSearchFocus: (mode) => dispatch(setSearchFocus(mode)),
    regionSelected: (region) => dispatch(regionSelected(region)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapController);
