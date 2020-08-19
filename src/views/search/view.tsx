import React from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Text as OriginText,
} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {
    setSearchStatus,
    setSearchResultText,
    setDisplayData,
    setSearchKeyword,
    mapPressed,
    setDestinationCoords,
} from '../../redux/actions';
import {
    INITIAL,
    DONE_SEARCHING,
    colors,
    SEARCHING,
    MAP_WITH_SEARCH,
    FREE_MAP,
} from '../../constants';
import {search} from '../../redux/thunks';
import {strings} from '../../locales/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MaterialIndicator} from 'react-native-indicators';

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
    mapPressed,
    setDestinationCoords,
}) => {
    return (
        <View>
            <View style={styles.searchbar}>
                <TextInput
                    onChangeText={(text) => {
                        setSearchKeyword(text);
                        setSearchStatus(INITIAL);
                        setSearchResultText('');
                    }}
                    value={keyword}
                    placeholder={strings.searchHere}
                    placeholderTextColor={colors.textGray}
                    style={{flex: 1, padding: 0, color: colors.white}}
                    onFocus={() => {
                        setSearchStatus(INITIAL);
                        setSearchResultText('');
                        mapPressed(MAP_WITH_SEARCH);
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
                            }}>
                            <View>
                                <Ionicons
                                    name="ios-search"
                                    size={20}
                                    color={colors.lightBlue}
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
                                mapPressed(FREE_MAP);
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

const mapStateToProps = ({searchState, mapState}) => ({
    keyword: searchState.searchKeyword,
    searchStatus: searchState.searchStatus,
    originalData: mapState.originalDataList,
    searchResultText: searchState.searchResultText,
});
const mapDispatchToProps = (dispatch) => ({
    setSearchKeyword: (text) => dispatch(setSearchKeyword(text)),
    setSearchStatus: (value) => dispatch(setSearchStatus(value)),
    setSearchResultText: (text) => dispatch(setSearchResultText(text)),
    search: (keyword, data) => dispatch(search(keyword, data)),
    setDisplayData: (data) => dispatch(setDisplayData(data)),
    mapPressed: (state) => dispatch(mapPressed(state)),
    setDestinationCoords: (location) =>
        dispatch(setDestinationCoords(location)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(Search);
