import React, {useEffect, useRef, memo} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Text as OriginText,
    Image
} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {
    setSearchStatus,
    setSearchResultText,
    setDisplayData,
    setSearchKeyword,
    setMapMode,
    setDestinationCoords,
    toggleMenu,
    hideDescription,
    setSearchFocus
} from '../../redux/actions';
import {
    INITIAL,
    DONE_SEARCHING,
    colors,
    SEARCHING,
    MAP_WITH_LIST
} from '../../constants';
import {search} from '../../redux/thunks';
import {strings} from '../../locales/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MaterialIndicator} from 'react-native-indicators';
import images from '../../assets/images';
import FilterItem from '../../component/common/FilterItem';

interface SearchInterface {
    setSearchStatus: any;
    setSearchResultText: any;
    search: any;
    keyword: string;
    searchStatus: string;
    originalData: Array<{}>;
    searchResultText: string;
    setDisplayData: any;
    setSearchKeyword: any;
    setMapMode: any;
    setDestinationCoords: any;
    toggleMenu: any;
    language: string;
    hideDescription: any;
    setSearchFocus: any;
    focus: boolean;
}

const Search = ({
    setSearchStatus,
    setSearchResultText,
    search,
    keyword,
    searchStatus,
    originalData,
    searchResultText,
    setDisplayData,
    setSearchKeyword,
    setMapMode,
    setDestinationCoords,
    toggleMenu,
    language,
    hideDescription,
    setSearchFocus,
    focus
}: SearchInterface) => {
    let _searchInput = useRef<TextInput>(null);

    useEffect(() => {
        console.log(focus, 'search');

        if (focus) {
            _searchInput.current?.focus();
        }
    }, [focus]);

    return (
        <View style={styles.plane}>
            <View style={styles.searchbar}>
                <TouchableOpacity onPress={toggleMenu}>
                    <View>
                        <Image style={styles.menu} source={images.menu} />
                    </View>
                </TouchableOpacity>
                <TextInput
                    ref={_searchInput}
                    onChangeText={(text) => {
                        setSearchKeyword(text);
                        setSearchStatus(INITIAL);
                        setSearchResultText('');
                    }}
                    value={keyword}
                    placeholder={strings.searchHere}
                    // placeholderTextColor={colors.textGray}
                    style={{flex: 1, padding: 0, color: colors.black}}
                    keyboardAppearance={'dark'}
                    onFocus={() => {
                        setSearchFocus(true);
                        setSearchStatus(INITIAL);
                        setSearchResultText('');
                        hideDescription();
                        console.log('focus');
                    }}
                    onSubmitEditing={() => {
                        if (!!keyword) {
                            Keyboard.dismiss();
                            search(keyword, originalData);
                        }
                        setSearchFocus(false);
                    }}
                />
                <View style={{}}>
                    {searchStatus == INITIAL && (
                        <TouchableOpacity
                            onPress={() => {
                                if (!!keyword) {
                                    Keyboard.dismiss();
                                    search(keyword, originalData);
                                }
                                setSearchFocus(false);
                            }}>
                            <View>
                                <Ionicons
                                    name="ios-search"
                                    size={20}
                                    color={colors.green}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    {searchStatus == DONE_SEARCHING && (
                        <TouchableOpacity
                            onPress={() => {
                                setSearchStatus(INITIAL);
                                setDisplayData(originalData);
                                console.log('press x');
                                setSearchKeyword('');
                                setSearchResultText('');
                                setMapMode(MAP_WITH_LIST);
                                setDestinationCoords(null);
                            }}>
                            <View>
                                <Ionicons
                                    name="close"
                                    size={25}
                                    color={colors.pink}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    {searchStatus == SEARCHING && (
                        <MaterialIndicator size={22} color={colors.lightBlue} />
                    )}
                </View>
            </View>
            {focus && (
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        justifyContent: 'center'
                    }}>
                    <FilterItem
                        text={strings.atm}
                        onPress={() => {
                            Keyboard.dismiss();
                            setSearchKeyword(strings.atm);
                            search(strings.atm, originalData);
                            setSearchFocus(false);
                        }}
                    />
                    <FilterItem
                        text={strings.branches}
                        onPress={() => {
                            Keyboard.dismiss();
                            setSearchKeyword(strings.branches);
                            search(strings.branches, originalData);
                            setSearchFocus(false);
                        }}
                    />
                    <FilterItem
                        text={strings.minibanks}
                        onPress={() => {
                            Keyboard.dismiss();
                            setSearchKeyword(strings.minibanks);
                            search(strings.minibanks, originalData);
                            setSearchFocus(false);
                        }}
                    />
                </View>
            )}
            {!!searchResultText ? (
                <View style={styles.searchResult}>
                    <OriginText style={styles.searchResultText}>
                        {searchResultText}
                    </OriginText>
                </View>
            ) : searchStatus == DONE_SEARCHING ? (
                <View style={styles.searchResult}>
                    <OriginText style={styles.searchResultText}>
                        {strings.nothingFound}
                    </OriginText>
                </View>
            ) : (
                <View style={styles.searchResult}></View>
            )}
        </View>
    );
};

const mapStateToProps = ({searchState, mapState, appState}: any) => ({
    keyword: searchState.searchKeyword,
    searchStatus: searchState.searchStatus,
    originalData: mapState.originalDataList,
    searchResultText: searchState.searchResultText,
    language: appState.language,
    focus: searchState.focusSearch
});
const mapDispatchToProps = (dispatch: any) => ({
    setSearchKeyword: (text: any) => dispatch(setSearchKeyword(text)),
    setSearchStatus: (value: any) => dispatch(setSearchStatus(value)),
    setSearchResultText: (text: any) => dispatch(setSearchResultText(text)),
    search: (keyword: string, data: any) => dispatch(search(keyword, data)),
    setDisplayData: (data: any) => dispatch(setDisplayData(data)),
    setMapMode: (state: any) => dispatch(setMapMode(state)),
    setDestinationCoords: (location: any) =>
        dispatch(setDestinationCoords(location)),
    toggleMenu: () => dispatch(toggleMenu()),
    hideDescription: () => dispatch(hideDescription()),
    setSearchFocus: (mode: any) => dispatch(setSearchFocus(mode))
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true
})(memo(Search));
