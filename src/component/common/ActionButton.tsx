import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageSourcePropType,
    TouchableOpacity,
    Image,
} from 'react-native';
import {colors} from '../../constants';

interface ActionButtonProps {
    onPress: any;
    text: string;
    image: ImageSourcePropType;
    alignment?: boolean;
    descText: string;
    accentColor?: string;
    big?: boolean;
}

const ActionButton = ({
    onPress,
    text,
    image,
    alignment,
    descText,
    accentColor,
    big,
}: ActionButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={[
                    styles.container,
                    !!alignment && {
                        flexDirection: 'row-reverse',
                    },
                ]}>
                <View
                    style={[
                        styles.imageWrapper,
                        !!accentColor && {
                            backgroundColor: accentColor,
                        },
                    ]}>
                    <Image
                        source={image}
                        style={[
                            styles.image,
                            big && {
                                height: 80,
                                width: 100,
                                resizeMode: 'contain',
                                borderRadius: 60,
                            },
                        ]}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 25,
                        alignItems: alignment ? 'flex-start' : 'flex-end',
                    }}>
                    <Text numberOfLines={1} style={styles.text}>
                        {text}
                    </Text>
                    <Text style={styles.descText}>{descText}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        alignItems: 'center',
        height: 60,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 10,
        borderRadius: 40,
        // marginTop: 10,
    },
    imageWrapper: {
        borderWidth: 5,
        borderColor: colors.white,
        backgroundColor: colors.pinkTrans,
        borderRadius: 100,
        height: 70,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -20,
        elevation: 5,
        overflow: 'hidden',
    },
    image: {
        height: 35,
        resizeMode: 'contain',
        width: 60,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.darkGray,
    },
    descText: {
        fontSize: 11,
        color: colors.gray,
    },
});

export default ActionButton;
