import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function Bank(props) {
    return (
        <Svg height={512} viewBox="0 0 64 64" width={512} {...props}>
            <Path d="M6 22h38v18H6z" fill="#d7d7e2" />
            <Path d="M12 30h6v4h-6z" fill="#4a83aa" />
            <Path d="M12 30h3v4h-3z" fill="#63afe3" />
            <Path d="M22 30h6v4h-6z" fill="#4a83aa" />
            <Path d="M22 30h3v4h-3z" fill="#63afe3" />
            <Path d="M32 30h6v4h-6z" fill="#4a83aa" />
            <Path d="M32 30h3v4h-3zM32 26H16v-8h14" fill="#63afe3" />
            <Path d="M4 40h42v18H4z" fill="#b3b6c2" />
            <Path d="M22 58v-7a3 3 0 116 0v7" fill="#9db5be" />
            <Path
                d="M23.5 48.416A2.987 2.987 0 0022 51v7h3v-7a2.987 2.987 0 00-1.5-2.584z"
                fill="#d1f2fd"
            />
            <Path d="M14 42h4v16h-4zM32 42h4v16h-4z" fill="#868992" />
            <Path d="M12 38h26v4H12z" fill="#4a83aa" />
            <Path d="M12 38h23v4H12z" fill="#63afe3" />
            <Path d="M2 58h46v4H2z" fill="#4a83aa" />
            <Path d="M2 58h42v4H2z" fill="#63afe3" />
            <Path
                d="M42.988 40L32.901 26.604C25.514 16.229 33.089 2 46 2s20.486 14.229 13.099 24.604L46 44z"
                fill="#7ec95f"
            />
            <Circle cx={46} cy={18} fill="#d7d7e2" r={12} />
            <Path
                d="M46 26a4.828 4.828 0 003.414-1.414A5.414 5.414 0 0051 20.757v-.354a5.41 5.41 0 00-.681-2.629L46 10l-4.252 7.654A5.936 5.936 0 0041 20.539v.218a5.41 5.41 0 001.586 3.828A4.825 4.825 0 0046 26z"
                fill="#ed6863"
            />
            <Path d="M19 21h10v2H19z" fill="#fff" />
            <Path
                d="M46 24v-2a1 1 0 001-1h2c0 1.654-1.346 3-3 3z"
                fill="#773432"
            />
        </Svg>
    );
}

export default Bank;
