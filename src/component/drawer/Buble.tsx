import React, {useCallback} from 'react';
import {InteractionManager, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {setLanguage} from '../../redux/actions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, BORDER_RADIUS} from '../../constants';
import {strings} from '../../locales/strings';

interface bubleProps {
    state: string;
    setLanguage: any;
    language: string;
}

const Buble = ({state, setLanguage, language}: bubleProps) => {
    const onPress = useCallback(() => {
        if (state !== language) {
            strings.setLanguage(state);
            setImmediate(() => setLanguage(state));
            console.log(state);
        }
    }, [state, language]);

    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={[
                    styles.container,
                    state == language && {
                        backgroundColor: colors.lightViolet
                    }
                ]}>
                <Text style={styles.text}>{state}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 70,
        padding: 10,
        backgroundColor: colors.lightPink,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    },
    text: {
        fontSize: 16,
        color: colors.darkBlack
    }
});

const mapStateToProps = ({appState}: any) => ({
    language: appState.language
});

const mapDispatchToProps = {
    setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(Buble);
