import {FlatList, View} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';

jest.useFakeTimers();

test('test flatlist', () => {
    const onEndReached = jest.fn();
    const {getByTestId} = render(
        <FlatList
            data={Array.from({length: 10}, (_, key) => ({key: `${key}`}))}
            renderItem={() => <View style={{height: 500, width: 100}} />}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.2}
            testID="flat-list"
        />,
    );

    const eventData = {
        nativeEvent: {
            contentOffset: {
                y: 500,
            },
            contentSize: {
                // Dimensions of the scrollable content
                height: 500,
                width: 100,
            },
            layoutMeasurement: {
                // Dimensions of the device
                height: 100,
                width: 100,
            },
        },
    };
});

fireEvent.scroll(getByTestId('flat-list'), eventData);
expect(onEndReached).toHaveBeenCalled();
