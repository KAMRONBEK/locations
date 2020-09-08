import React from 'react';
import {Text as DefualtText, TextProps} from 'react-native';

export interface DefualtTextProps {
    children?: any;
}

//light-book-medium-demi-bold-extrabold

const Text = ({style = {}, ...rest}: TextProps & DefualtTextProps) => {
    let fontFamily = 'Roboto-Regular';
    let {fontWeight = ''} = style;

    if (fontWeight.toString().toLowerCase() === 'bold')
        fontFamily = 'Roboto-Black';
    if (fontWeight == '100' || fontWeight == '200') {
        fontFamily = 'Roboto-Light';
    } else if (fontWeight === '300') {
        fontFamily = 'Roboto-Medium';
    } else if (fontWeight == '500' || fontWeight == '600') {
        fontFamily = 'Roboto-Bold';
    } else if (fontWeight == '700') {
        fontFamily = 'Roboto-Black';
    } else if (fontWeight === '900' || fontWeight === '800') {
        fontFamily = 'Roboto-ExtraBold';
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
