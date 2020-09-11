import React from 'react';
import {Text as DefualtText, TextProps} from 'react-native';

export interface DefualtTextProps {
    children?: any;
}

//light-book-medium-demi-bold-extrabold

const Text = ({style = {}, ...rest}: TextProps & DefualtTextProps) => {
    let fontFamily = 'RobotoRegular';
    let {fontWeight = ''} = style;

    if (fontWeight.toString().toLowerCase() === 'bold')
        fontFamily = 'RobotoBlack';
    if (fontWeight == '100' || fontWeight == '200') {
        fontFamily = 'RobotoLight';
    } else if (fontWeight === '300') {
        fontFamily = 'RobotoMedium';
    } else if (fontWeight == '500' || fontWeight == '600') {
        fontFamily = 'RobotoBold';
    } else if (fontWeight == '700') {
        fontFamily = 'RobotoBlack';
    } else if (fontWeight === '900' || fontWeight === '800') {
        fontFamily = 'RobotoExtraBold';
    }

    // let newStyle = () => {
    //     Object.keys(style).map((styleKey, styleIndex) => {
    //         if (style[styleKey] !== 'fontWeight') {
    //             return style[styleKey];
    //         }
    //     });
    // };

    return <DefualtText {...rest} style={[{fontFamily}, style]}></DefualtText>;
};

export default Text;
