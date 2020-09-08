import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, BORDER_RADIUS} from '../../constants';
import {strings} from '../../locales/strings';

interface DescCardProps {
    onPress: any;
    iconName: string;
    name: string;
}

const DescCard = ({onPress, iconName, name}: DescCardProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Ionicons name={iconName} size={20} color={colors.green} />
                <Text style={styles.text}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: '300',
        fontSize: 13,
        color: colors.textGray,
    },

    card: {
        backgroundColor: colors.lightViolet,
        width: 100,
        height: 75,
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DescCard;
