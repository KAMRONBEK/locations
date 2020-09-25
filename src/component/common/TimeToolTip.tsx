import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import moment from 'moment';
import {colors} from '../../constants';
import {strings} from '../../locales/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

interface toolTipProps {
    beginTime: string;
    endTime: string;
    language: string;
}

const TimeToolTip = ({beginTime, endTime, language}: toolTipProps) => {
    let [currentTime, setCurrentTime] = useState(
        moment(new Date(), 'hh:mm:ss'),
    );
    let [diffTime, setDiffTime] = useState(0);

    let [isOpen, setIsOpen] = useState(false);
    let [toolTipVis, setToolTipVis] = useState(false);

    useEffect(() => {
        if (
            currentTime.isBetween(
                moment(beginTime, 'hh:mm:ss'),
                moment(endTime, 'hh:mm:ss'),
            )
        ) {
            setIsOpen(true);
            setDiffTime(
                Math.abs(
                    Math.round(
                        moment
                            .duration(
                                currentTime.diff(moment(endTime, 'hh:mm:ss')),
                            )
                            .asMinutes(),
                    ),
                ),
            );
        } else {
            setIsOpen(false);
            setDiffTime(
                Math.round(
                    moment
                        .duration(
                            currentTime.diff(moment(beginTime, 'hh:mm:ss')),
                        )
                        .asMinutes(),
                ),
            );
        }
    }, [beginTime, endTime, currentTime, language]);

    return (
        <Tooltip
            topAdjustment={Platform.OS == 'android' ? -28 : 0}
            arrowSize={{width: 16, height: 16}}
            isVisible={toolTipVis}
            backgroundColor={'rgba(0,0,0,0.3)'}
            content={
                <View style={{flex: 1}}>
                    <Text
                        style={{
                            fontSize: 12,
                            color: colors.darkBlack,
                        }}>
                        {diffTime > 60
                            ? Math.floor(diffTime / 60) +
                              ' ' +
                              strings.hour +
                              ' ' +
                              (diffTime % 60)
                            : diffTime}{' '}
                        {strings.min}{' '}
                        {isOpen ? strings.closesAfter : strings.opensAfter}
                    </Text>
                </View>
            }
            placement="top"
            onClose={() => setToolTipVis(false)}>
            <TouchableOpacity onPress={() => setToolTipVis(true)}>
                <View
                    style={{
                        flexDirection: 'row',
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 5,
                    }}>
                    <Text
                        style={{
                            color: colors.textGray,
                            textAlign: 'center',
                            textTransform: 'capitalize',
                        }}>
                        {isOpen ? strings.open : strings.closed}
                    </Text>
                    <Ionicons
                        name="information-circle"
                        size={15}
                        color={colors.blue}
                    />
                </View>
            </TouchableOpacity>
        </Tooltip>
    );
};

const styles = StyleSheet.create({});

const mapStateToProps = ({appState}: any) => ({
    language: appState.language,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TimeToolTip);
