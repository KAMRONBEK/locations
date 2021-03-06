import React, {useState, useRef} from 'react';
import {
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Keyboard
} from 'react-native';
import {deviceWidth, BORDER_RADIUS} from '../../constants/values';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../constants';
import {strings} from '../../locales/strings';

interface ChatInputProps {
    setMessage: any;
    messages: any;
}

const ChatInput = ({setMessage, messages}: ChatInputProps) => {
    //functions
    const onTextChange = (value: string) => {
        setInput(value);
    };

    const onSubmitMessage = () => {
        if (!!input) {
            setMessage([
                ...messages,
                {type: 'send', date: '10:15', message: input}
            ]);
        }
        setInput('');
    };
    const _input = useRef<TextInput>(null);

    const onEmojiPress = () => {
        if (_input.current) {
            _input.current.focus();
        }
    };
    //variables
    let [input, setInput] = useState('');

    return (
        <View style={[styles.container]}>
            <TouchableOpacity onPress={onEmojiPress}>
                <SimpleLineIcons
                    name="emotsmile"
                    size={24}
                    color={colors.lightBlue}
                />
            </TouchableOpacity>
            <TextInput
                ref={_input}
                multiline={true}
                underlineColorAndroid="transparent"
                style={styles.input}
                placeholder={strings.message}
                value={input}
                keyboardType={'twitter'}
                onChangeText={(value) => {
                    onTextChange(value);
                }}
            />
            <TouchableOpacity onPress={onSubmitMessage}>
                <SimpleLineIcons
                    name="paper-plane"
                    size={25}
                    color={colors.lightBlue}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: BORDER_RADIUS
    },
    input: {
        paddingHorizontal: 10,
        padding: 0,
        width: deviceWidth * 0.7
    }
});

export default ChatInput;
