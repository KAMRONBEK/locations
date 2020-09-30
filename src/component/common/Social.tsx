import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    ImageSourcePropType,
    TouchableOpacity,
    Linking,
} from 'react-native';
import {colors} from '../../constants';

interface SocialProps {
    image: ImageSourcePropType;
    url: string;
}

const Social = ({image, url}: SocialProps) => {
    const onPress = () => {
        Linking.openURL(url);
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image source={image} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        padding: 5,
        backgroundColor: colors.lightGreen,
        elevation: 5,
        shadowColor: colors.black,
        shadowRadius: 5,
        shadowOpacity: 0.3,
    },
    image: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
});

export default Social;
