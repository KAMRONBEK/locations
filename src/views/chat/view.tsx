import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import styles from './styles';
import ChatMessage from '../../component/common/ChatMessage';
import ChatInput from '../../component/common/ChatInput';
import {strings} from '../../locales/strings';

let Chat = () => {
    let [messagesList, setMessageList] = useState([
        {
            id: '1',
            message:
                'this is me and this is message that you wanted, you happy?',
            date: '10:10',
            type: 'recieve',
        },
        {
            id: '2',
            message:
                'this is me and this is message that you wanted, you happy? I am asking?',
            date: '10:10',
            type: 'recieve',
        },
        {
            id: '3',
            message: 'yeah I am very very Happy 😀😀😀',
            date: '10:11',
            type: 'send',
        },
    ]);

    let flatList = useRef(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{strings.chat}</Text>
            <FlatList
                ref={flatList}
                onContentSizeChange={() =>
                    flatList.current.scrollToEnd({animated: true})
                }
                onLayout={() => flatList.current.scrollToEnd({animated: true})}
                contentContainerStyle={styles.chatArea}
                data={messagesList}
                renderItem={({item, index}) => (
                    <ChatMessage item={item} key={index} />
                )}
                keyExtractor={(item, index) => (item + index).toString()}
            />
            <View style={styles.inputWrapper}>
                <ChatInput
                    setMessage={setMessageList}
                    messages={messagesList}
                />
            </View>
        </View>
    );
};

export default Chat;
