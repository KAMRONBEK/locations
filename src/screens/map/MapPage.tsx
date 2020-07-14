import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Platform,
    Animated,
} from 'react-native';
import Map from './Map';
import Service from '../../services/service';
import RoundButton from '../../component/common/RoundButton';
import Text from '../../component/Text';
import {strings} from '../../locales/strings';
import FilterItem from '../../component/common/FilterItem';
import {colors, CARD_WIDTH, SPACING_FOR_CARD_INSET} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MarkerCard from '../../component/common/MarkerCard';

const temp = [
    {
        id: '1',
        name:
            '\u0422\u041e\u0428\u041a\u0415\u041d\u0422 \u0428., "\u0418\u041f\u0410\u041a \u0419\u0423\u041b\u0418" \u0410\u0418\u0422 \u0411\u0410\u041d\u041a\u0418\u041d\u0418\u041d\u0413 \u041c\u0418\u0420\u0417\u041e \u0423\u041b\u0423\u0413\u0411\u0415\u041a \u0424\u0418\u041b\u0418\u0410\u041b\u0418',
        address:
            '100000, T\u043e\u0448\u043a\u0435\u043d\u0442 \u0448., \u041c.\u0423\u043b\u0443\u0433\u0431\u0435\u043a \u0442., X\u0430\u043c\u0438\u0434 \u041e\u043b\u0438\u043c\u0436\u043e\u043d \u043a., 5',
        location: '41.314719, 69.293920',
        mfo: '00421',
        bank: '09014',
        phone: ['+998711480777'],
        trial503: 'T',
    },
    {
        id: '2',
        name:
            '\u0422\u041e\u0428\u041a\u0415\u041d\u0422 \u0428., "\u0418\u041f\u0410\u041a \u0419\u0423\u041b\u0418" \u0410\u0418\u0422 \u0411\u0410\u041d\u041a\u0418\u041d\u0418\u041d\u0413 \u0411\u041e\u0428 \u041e\u0424\u0418\u0421\u0418',
        address:
            '100017, \u0422\u043e\u0448\u043a\u0435\u043d\u0442 \u0448., \u042e\u043d\u0443\u0441\u043e\u0431\u043e\u0434 \u0442., \u041a\u043e\u0434\u0438\u0440\u0438\u0439 \u043a., 2',
        location: '41.322475,69.280615',
        mfo: '00444',
        bank: '09014',
        phone: ['+998781406900', '+998781200009'],
        trial503: 'T',
    },
    {
        id: '3',
        name:
            '\u0421\u0410\u041c\u0410\u0420\u041a\u0410\u041d\u0414 \u0428., "\u0418\u041f\u0410\u041a \u0419\u0423\u041b\u0418" \u0410\u0418\u0422 \u0411\u0410\u041d\u041a\u0418\u041d\u0418\u041d\u0413 \u0423\u041c\u0410\u0420 \u041c\u0418\u041d\u0422\u0410\u041a\u0410\u0412\u0418\u0419 \u0424\u0418\u041b\u0418\u0410\u041b\u0418',
        address:
            '140120, \u0421\u0430\u043c\u0430\u0440\u043a\u0430\u043d\u0434 \u0448., \u0414\u0430\u0445\u0431\u0435\u0434 \u043a., 14',
        location: '39.669593,66.970065',
        mfo: '00283',
        bank: '09014',
        phone: ['+998662100650', '+998662324199'],
        trial503: 'T',
    },
    {
        id: '4',
        name:
            '\u041a\u0410\u0420\u0428\u0418 \u0428., "\u0418\u041f\u0410\u041a \u0419\u0423\u041b\u0418" \u0410\u0418\u0422 \u0411\u0410\u041d\u041a\u0418\u041d\u0418\u041d\u0413 \u041a\u0410\u0420\u0428\u0418 \u0424\u0418\u041b\u0418\u0410\u041b\u0418',
        address:
            '180100, \u041a\u0430\u0440\u0448\u0438 \u0448., \u041c\u0443\u0441\u0442\u0430\u043a\u0438\u043b\u043b\u0438\u043a \u043a., 18',
        location: '38.839020,65.801051',
        mfo: '01119',
        bank: '09014',
        phone: ['+998752214470', '+998752214439'],
        trial503: 'T',
    },
    {
        id: '5',
        name:
            '\u0410\u041d\u0414\u0418\u0416\u041e\u041d \u0428., "\u0418\u041f\u0410\u041a \u0419\u0423\u041b\u0418" \u0410\u0418\u0422 \u0411\u0410\u041d\u041a\u0418\u041d\u0418\u041d\u0413 \u0410\u041d\u0414\u0418\u0416\u041e\u041d \u0424\u0418\u041b\u0418\u0410\u041b\u0418',
        address:
            '170100, \u0410\u043d\u0434\u0438\u0436\u043e\u043d \u0448., \u0418\u0441\u0442\u0438\u043a\u043b\u043e\u043b \u043a., 35',
        location: '40.761561,72.359089',
        mfo: '01120',
        bank: '09014',
        phone: ['+998742282211'],
        trial503: 'T',
    },
];

const MapPage = () => {
    return (
        <View style={styles.container}>
            <Map />
            <View style={styles.searchbar}>
                <TextInput
                    placeholder={strings.searchHere}
                    autoCapitalize="none"
                    style={{flex: 1, padding: 0}}
                />
                <Ionicons name="ios-search" size={20} />
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterScrollView}
                contentInset={{
                    // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20,
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0,
                }}>
                <FilterItem text={strings.atm} key={'1'} />
                <FilterItem text={strings.branches} key={'2'} />
                <FilterItem text={strings.minibanks} key={'3'} />
            </ScrollView>

            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET,
                }}
                contentContainerStyle={{
                    paddingHorizontal:
                        Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
                }}>
                {temp.map((item, index) => {
                    return <MarkerCard key={index} {...item} />;
                })}
            </Animated.ScrollView>
        </View>
    );
};

export default MapPage;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    searchbar: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: 'row',
        backgroundColor: colors.white,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        shadowColor: colors.gray,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
    },
    filterScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10,
    },
    scrollView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
});
