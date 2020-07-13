import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface RoundButtonProps {
    text: string;
    backgoundColor: string;
}

const RoundButton = ({}: RoundButtonProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    text: {
        fontFamily: 'Futura',
        fontWeight: 'bold',
    },
});

export default RoundButton;
