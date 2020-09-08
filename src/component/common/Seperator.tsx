import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StyleSheetProperties,
    ViewStyle,
} from 'react-native';
import {colors} from '../../constants';

interface SeperatorProps {
    containerStyle?: ViewStyle;
    borderColor?: string;
    thickness?: number;
    width?: string;
}

const Seperator = ({
    containerStyle,
    borderColor,
    thickness,
    width,
}: SeperatorProps) => {
    return (
        <View
            style={[
                styles.container,
                containerStyle,
                !!width && {
                    width: width,
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 0.5,
        borderColor: colors.gray,
        alignSelf: 'center',
    },
});

export default Seperator;
