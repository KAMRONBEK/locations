import React, {
    useState,
    Dispatch,
    SetStateAction,
    MutableRefObject,
    useEffect,
    RefObject,
} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import Service from '../../services/service';
import {strings} from '../../locales/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, deviceHeight} from '../../constants';
import {MaterialIndicator} from 'react-native-indicators';
import Text from './Text';
import {Text as OriginText} from 'react-native';
import MapView, {LatLng} from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {branchType} from '../../screens/map/Map';

interface SearchBarProps {
    searchData: branchType[];
    onSearch: any;
    mapRef: RefObject<MapView | null>;
    searchResultList: LatLng[];
    slidePanelRef: RefObject<SlidingUpPanel | null>;
}

const SearchBar = ({
    searchData,
    onSearch,
    mapRef,
    searchResultList,
    slidePanelRef,
}: SearchBarProps) => {
    let [searchKey, setSearchKey] = useState('');
    const [searchState, setSearchState] = useState('initial'); //searching, searched, initial
    const [searchResultCount, setSearchResultCount] = useState(0);
    const [searchResultText, setSearchResultText] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
                if (slidePanelRef.current) {
                    slidePanelRef.current.hide();
                }
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
                if (slidePanelRef.current) {
                    slidePanelRef.current.show();
                }
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const search = (searchKey: string) => {
        setSearchState('searching');
        Service.search({
            searchKey: searchKey,
            list: searchData,
        })
            .then((res: any) => {
                setSearchResultCount(res.length);
                setSearchResultText(
                    strings.found + ' ' + res.length + ' ' + strings.results,
                );
                onSearch(res);
                if (mapRef.current) {
                    mapRef.current.fitToCoordinates(searchResultList, {
                        edgePadding: {
                            top: 20,
                            left: 20,
                            right: 20,
                            bottom: 20,
                        },
                        animated: true,
                    });
                }
            })
            .catch((err) => {
                setSearchResultCount(0);
                setSearchResultText('');
                console.log(err);
            })
            .finally(() => {
                setSearchState('searched');
            });
    };
    return (
        <View>
            <View style={styles.searchbar}>
                <TextInput
                    onChangeText={(text) => {
                        setSearchKey(text);
                        setSearchState('initial');
                        setSearchResultText('');
                    }}
                    value={searchKey}
                    placeholder={strings.searchHere}
                    style={{flex: 1, padding: 0}}
                    onFocus={() => {
                        setSearchState('initial');
                        setSearchResultText('');
                    }}
                />
                <View style={{}}>
                    {searchState == 'initial' && (
                        <TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss();
                                if (!!searchKey) {
                                    search(searchKey);
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
                    {searchState == 'searched' && (
                        <TouchableOpacity
                            onPress={() => {
                                setSearchState('initial');
                                onSearch(searchData);
                                setSearchKey('');
                                setSearchResultText('');
                            }}>
                            <View>
                                <Ionicons
                                    name="close"
                                    size={25}
                                    color={colors.red}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                    {searchState == 'searching' && (
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
            ) : searchState == 'searched' ? (
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

const styles = StyleSheet.create({
    searchbar: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 10,
        shadowColor: colors.gray,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    searchResult: {
        overflow: 'hidden',
        borderRadius: 20,
        maxHeight: deviceHeight * 0.5,
        padding: 5,
    },
    searchItem: {
        paddingVertical: 10,
    },
    searchResultText: {
        fontSize: 14,
        // fontWeight: '900',
        fontStyle: 'italic',
        color: colors.textGray,
    },
});

export default SearchBar;
