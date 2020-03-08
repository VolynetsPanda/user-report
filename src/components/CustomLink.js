import React from 'react';
import styles from '../modules/style';
import {Text, TouchableOpacity, View} from 'react-native';

const CustomLink = ({navigation, text, link}) => {
    const {btn, wrap} = styles;
    return (
        <View style={wrap}>
            <TouchableOpacity
                onPress={() => navigation.navigate(link)}
                style={btn}
            >
                <Text>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};


export default CustomLink;
