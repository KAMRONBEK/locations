import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors} from '../../constants';
import Text from '../Text';

interface FilterItemProps {
    text: string;
}

const FilterItem = ({text}: FilterItemProps) => {
    const onPress = () => {};

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
        borderWidth: 0.5,
        borderColor: colors.gray,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.ultraLightBlue,
        marginRight: 10,
    },
});

export default FilterItem;
