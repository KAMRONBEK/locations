import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants';

interface ChatMessageProps {
    item: {message: string; date: string; type: string};
}

const ChatMessage = ({item}: ChatMessageProps) => {
    return (
        <View
            style={[
                styles.container,
                item.type === 'send'
                    ? {
                          alignItems: 'flex-end',
                      }
                    : {
                          alignItems: 'flex-start',
                      },
            ]}>
            <View
                style={[
                    styles.buble,
                    item.type === 'send'
                        ? {
                              backgroundColor: colors.blue,
                              borderBottomRightRadius: 5,
                          }
                        : {
                              backgroundColor: colors.ultraLightBlue,
                              borderBottomLeftRadius: 5,
                          },
                ]}>
                <Text
                    style={[
                        styles.message,
                        item.type === 'send'
                            ? {
                                  color: colors.white,
                              }
                            : {
                                  color: colors.black,
                              },
                    ]}>
                    {item.message}
                </Text>
            </View>
            <Text style={styles.date}>{item.date}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buble: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 300,
        marginTop: 20,
    },
    message: {
        fontSize: 13,
    },
    date: {
        fontSize: 12,
        color: colors.darkBlack,
    },
});

export default ChatMessage;
