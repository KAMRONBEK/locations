jest.mock('react-native-splash-screen', () => {
    return {
        hide: jest.fn(),
        show: jest.fn(),
    };
});

jest.useFakeTimers();
