/**
 * @format
 */

import React from 'react';
import App from '../App';
import {render, afterEach, cleanup} from '@testing-library/react-native';

jest.useFakeTimers();

describe('when logged in', () => {
    it('renders the user', () => {
        render(<App />);
        // ...
    });
});
