import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {BORDER_RADIUS} from '../../constants';

const RectangleButton = ({onPress, backColor, buttonTextColor, buttonText}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.plane]}>
                <View style={{...styles.container, backgroundColor: backColor}}>
                    <Text
                        style={{
                            ...styles.text,
                            color: buttonTextColor,
                            textTransform: 'uppercase',
                        }}>
                        {buttonText}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    plane: {
        borderRadius: BORDER_RADIUS,
        // marginBottom: 20,
        overflow: 'hidden',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        minWidth: Dimensions.get('window').width - 150,
    },
    text: {
        fontSize: 16,
    },
});

export default RectangleButton;
