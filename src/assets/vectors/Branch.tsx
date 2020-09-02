import * as React from 'react';
import Svg, {Rect, Path, Circle, G} from 'react-native-svg';

function Branch(props) {
    return (
        <Svg
            data-name="Layer 1"
            viewBox="0 0 512 512"
            width={30}
            height={30}
            {...props}>
            <Path
                d="M389.24 323.39c15.38 0 27.85 12.8 27.85 28.6s-12.47 28.61-27.85 28.61-27.86-12.81-27.86-28.61 12.47-28.6 27.86-28.6z"
                fill="#e48e66"
            />
            <Path
                d="M285.85 408.79H12.76v-37.64h266.48a109.69 109.69 0 006.61 37.64zM363.48 145.26v118.92a109.073 109.073 0 00-35.29 15.45V145.26zM239.47 145.26h35.3V333.5h-35.3zM150.76 145.26h35.29V333.5h-35.29zM62.05 145.26h35.29V333.5H62.05z"
                fill="#6fe3ff"
            />
            <Path
                d="M274.77 333.5h11.08a109.7 109.7 0 00-6.61 37.65H36.29V333.5h238.48zM212.76 68.41a23.53 23.53 0 11-23.52 23.53 23.53 23.53 0 0123.52-23.53zM454.1 352.77a64.425 64.425 0 01-3.87 26.36 69.591 69.591 0 01-14.86 23.56l-46.13 49.14-46.14-49.14a69.591 69.591 0 01-14.86-23.56 64.425 64.425 0 01-3.87-26.36c2.21-33.04 28.6-62.31 64.87-62.31s62.65 29.27 64.86 62.31zm-37.01-.78c0-15.8-12.47-28.6-27.85-28.6s-27.86 12.8-27.86 28.6 12.47 28.61 27.86 28.61 27.85-12.81 27.85-28.61z"
                fill="#f8ec7d"
            />
            <Path
                d="M328.19 279.63a109.073 109.073 0 0135.29-15.45 110.1 110.1 0 11-35.75 15.75c.15-.1.3-.21.46-.3zm122.04 99.5a64.425 64.425 0 003.87-26.36c-2.21-33.04-28.6-62.31-64.86-62.31s-62.66 29.27-64.87 62.31a64.425 64.425 0 003.87 26.36 69.591 69.591 0 0014.86 23.56l46.14 49.14 46.13-49.14a69.591 69.591 0 0014.86-23.56zM406.88 115.26v30H18.65v-30l194.11-84.41zM236.29 91.94a23.525 23.525 0 10-23.53 23.53 23.53 23.53 0 0023.53-23.53z"
                fill="#e48e66"
            />
        </Svg>
    );
}

export default Branch;