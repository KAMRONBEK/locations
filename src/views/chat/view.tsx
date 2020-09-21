import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import styles from './styles';
import ChatMessage from '../../component/common/ChatMessage';
import ChatInput from '../../component/common/ChatInput';
import {strings} from '../../locales/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {navigate} from '../../services/navigationServices';
import {SCREENS} from '../../constants';
import {NavigationProp} from '@react-navigation/native';

interface chatProps {
    navigation: NavigationProp<{}>;
}

let Chat = ({navigation}: chatProps) => {
    let [messagesList, setMessageList] = useState([
        {
            id: '1',
            message:
                'this is me and this is message that you wanted, you happy?',
            date: '10:10',
            type: 'recieve'
        },
        {
            id: '2',
            message:
                'this is me and this is message that you wanted, you happy? I am asking?',
            date: '10:10',
            type: 'recieve'
        },
        {
            id: '3',
            message: 'yeah I am very very Happy 😀😀😀',
            date: '10:11',
            type: 'send'
        }
    ]);

    let flatList = useRef<FlatList>(null);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backWrapper}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Ionicons name="arrow-back" size={15} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>{strings.chat}</Text>
            </View>
            <FlatList
                ref={flatList}
                onContentSizeChange={() => {
                    if (flatList.current) {
                        flatList.current.scrollToEnd({animated: true});
                    }
                }}
                onLayout={() => {
                    if (flatList.current) {
                        flatList.current.scrollToEnd({animated: true});
                    }
                }}
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
