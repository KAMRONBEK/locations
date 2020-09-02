import React from 'react';
import {
    View,
    StyleSheet,
    GestureResponderEvent,
    TouchableOpacity,
    Text,
} from 'react-native';
import {colors, deviceWidth} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type DrawerItemProps = {
    iconName: string;
    text: string;
    hasBorder?: boolean;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    size?: number;
};

const DrawerItem = ({
    iconName,
    text,
    onPress,
    hasBorder = true,
    size,
}: DrawerItemProps) => {
    return (
        <View style={styles.plane}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <Ionicons
                        style={styles.icon}
                        name={iconName}
                        color={colors.darkBlack}
                        size={!size ? 24 : size}
                    />
                    <Text
                        style={{
                            ...styles.text,
                            borderBottomWidth: hasBorder ? 1 : 0,
                        }}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    plane: {
        width: deviceWidth * 0.7,
    },
    container: {
        flexDirection: 'row',
        marginTop: 15,
    },
    icon: {
        width: 40,
    },
    text: {
        fontWeight: '300',
        color: colors.darkGray,
        borderBottomWidth: 1,
        paddingBottom: 15,
        width: 180,
        borderColor: colors.darkBlack,
        fontSize: 17,
    },
});

export default DrawerItem;
