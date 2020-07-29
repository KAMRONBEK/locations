import React from 'react';
import {Text as DefualtText, TextProps} from 'react-native';

export interface DefualtTextProps {
    children?: any;
}

//light-book-medium-demi-bold-extrabold

const Text = ({style = {}, ...rest}: TextProps & DefualtTextProps) => {
    let fontFamily = 'FuturaPT-Medium';
    let {fontWeight = ''} = style;

    if (fontWeight.toString().toLowerCase() === 'bold')
        fontFamily = 'FuturaPT-Bold';
    if (fontWeight == '100' || fontWeight == '200') {
        fontFamily = 'FuturaPT-Light';
    } else if (fontWeight === '300') {
        fontFamily = 'FuturaPT-Book';
    } else if (fontWeight == '500' || fontWeight == '600') {
        fontFamily = 'FuturaPT-Demi';
    } else if (fontWeight == '700') {
        fontFamily = 'FuturaPT-Bold';
    } else if (fontWeight === '900' || fontWeight === '800') {
        fontFamily = 'FuturaPT-ExtraBold';
    }

    let newStyle = () => {
        Object.keys(style).map((styleKey, styleIndex) => {
            if (style[styleKey] !== 'fontWeight') {
                return style[styleKey];
            }
        });
    };

    return (
        <DefualtText {...rest} style={[newStyle, {fontFamily}]}></DefualtText>
    );
};

export default Text;
