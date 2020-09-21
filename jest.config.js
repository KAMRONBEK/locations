module.exports = {
    preset: 'react-native',
    transform: {
        '^.+\\.jsx?$':
            '<rootDir>/node_modules/react-native/jest/preprocessor.js',
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/assetsTransformer.js',
        '\\.(css|less)$': '<rootDir>/assetsTransformer.js'
    },
    transformIgnorePatterns: [
        // '/node_modules/(?!(rn-sliding-up-panel|react-native|react-native-maps)/)',
        'node_modules/(?!((jest-)?rn-sliding-up-panel|react-native|react-navigation|@react-navigation/.*|@react-native-community/picker))'
    ],
    globals: {
        // we must specify a custom tsconfig for tests because we need the typescript transform
        // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
        // can see this setting in tsconfig.jest.json -> "jsx": "react"
        'ts-jest': {
            tsConfig: 'tsconfig.jest.json'
        }
    }
};
