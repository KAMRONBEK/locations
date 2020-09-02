import React, {useEffect, useState, memo} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {colors, deviceHeight, deviceWidth} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hideList} from '../../redux/actions';
import {ScrollView} from 'react-native-gesture-handler';
import ListItem from '../../component/mapRelated/ListItem';
import {strings} from '../../locales/strings';

const List = ({panelVisibility, hideList, displayData}) => {
    let [animatedRadius, setRadius] = useState(new Animated.Value(0));
    let [opacity, setOpacity] = useState(new Animated.Value(0));
    let [translateY, setTanslateY] = useState(new Animated.Value(deviceHeight));
    // let [xAlign, setXAlign] = useState(new Animated.Value('center'));
    let [translateX, setTranslateX] = useState(new Animated.Value(0));
    // useEffect(() => {
    if (panelVisibility) {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(animatedRadius, {
                toValue: 0,
                useNativeDriver: true,
                duration: 500,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 500,
            }),
            Animated.timing(translateX, {
                toValue: 100,
                useNativeDriver: true,
                duration: 500,
            }),
        ]).start();
    } else {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: deviceHeight,
                useNativeDriver: true,
                duration: 500,
            }),
            Animated.timing(animatedRadius, {
                toValue: 100,
                useNativeDriver: true,
                duration: 500,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                useNativeDriver: true,
                duration: 500,
            }),
            Animated.timing(translateX, {
                toValue: 0,
                useNativeDriver: true,
                duration: 500,
            }),
        ]).start();
    }
    // }, [panelVisibility]);

    const closeList = () => hideList();

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{translateY}],
                    borderRadius: animatedRadius,
                    opacity: opacity,
                },
            ]}>
            <View style={[styles.top]}>
                <Text style={styles.text}>
                    {strings.placesCount}: {displayData.length}
                </Text>
                <TouchableOpacity onPress={hideList}>
                    <View style={styles.closeWrapper}>
                        <Ionicons
                            name="close-outline"
                            size={35}
                            color={colors.pink}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={displayData}
                keyExtractor={(item, index) => (item + index).toString()}
                contentContainerStyle={styles.listWrapper}
                renderItem={({item, index}) => (
                    <ListItem item={item} index={index} />
                )}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: colors.ultraLightBlue,
        borderColor: colors.black,
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        height: deviceHeight,
        paddingTop: 30,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    listWrapper: {
        paddingHorizontal: 15,
        marginTop: 10,
    },
    text: {
        fontSize: 18,
        color: colors.darkBlack,
    },
});

const mapStateToProps = ({listState, mapState}) => ({
    panelVisibility: listState.panelVisibility,
    displayData: mapState.displayDataList,
});

const mapDispatchToProps = (dispatch) => ({
    hideList: () => dispatch(hideList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(List));
