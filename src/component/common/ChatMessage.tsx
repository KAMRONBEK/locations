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
                              borderBottomRightRadius: 0,
                          }
                        : {
                              backgroundColor: colors.dimGray,
                              borderBottomLeftRadius: 0,
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
        borderRadius: 40,
        width: 300,
        marginTop: 20,
    },
    message: {
        fontSize: 13,
    },
    date: {
        fontSize: 12,
        color: colors.gray,
    },
});

export default ChatMessage;
