import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors} from '../../constants';
import Text from './Text';

interface FilterItemProps {
    text: string;
}

const FilterItem = ({text, onPress}: FilterItemProps) => {
    // const onPress = () => {};

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.lightPink,
        marginRight: 10,
    },
});

export default FilterItem;
