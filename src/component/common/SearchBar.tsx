import React, {
    useState,
    Dispatch,
    SetStateAction,
    MutableRefObject,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import Service from '../../services/service';
import {strings} from '../../locales/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, deviceHeight} from '../../constants';

interface SearchBarProps {
    searchData: Array<object>;
    onSearch: Dispatch<SetStateAction<never[]>>;
    mapRef: MutableRefObject<null>;
    searchResultList: Array<object>;
}

const SearchBar = ({
    searchData,
    onSearch,
    mapRef,
    searchResultList,
}: SearchBarProps) => {
    let [searchKey, setSearchKey] = useState('');

    const search = (searchKey: string) => {
        Service.search({
            searchKey: searchKey,
            list: searchData,
        })
            .then((res) => {
                console.log(res.length + 'ta topildi');
                onSearch(res);
                mapRef.current.fitToCoordinates(searchResultList, {
                    edgePadding: {
                        top: 20,
                        left: 20,
                        right: 20,
                        bottom: 20,
                    },
                    animated: true,
                });
            })
            .catch((err) => console.log(err));
    };
    return (
        <View style={styles.searchbar}>
            <TextInput
                onChangeText={(text) => {
                    setSearchKey(text);
                }}
                placeholder={strings.searchHere}
                style={{flex: 1, padding: 0}}
                onFocus={(e) => {
                    console.log(e);
                }}
            />
            <Pressable
                onPress={() => {
                    console.log('touch');
                    if (!!searchKey) {
                        search(searchKey);
                    }
                }}>
                <View>
                    <Ionicons name="ios-search" size={20} />
                </View>
            </Pressable>
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
    },
    searchResult: {
        overflow: 'hidden',
        borderRadius: 20,
        maxHeight: deviceHeight * 0.5,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        marginVertical: 10,
    },
    searchItem: {
        paddingVertical: 10,
    },
});

export default SearchBar;
