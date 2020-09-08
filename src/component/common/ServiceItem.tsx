import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants';

interface ServiceItemProps {
    onPress: any;
    text: string;
    icon: string;
}

const ServiceItem = ({onPress, text, icon}: ServiceItemProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.plain}>
                <View style={styles.container}>
                    <MaterialIcons name={icon} size={20} color={colors.blue} />
                </View>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    plain: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        borderRadius: 100,
        width: 40,
        height: 40,
        borderColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    text: {
        textAlign: 'center',
        color: colors.blue,
        // maxWidth: '80%',
        width: 80,
    },
});

export default ServiceItem;
