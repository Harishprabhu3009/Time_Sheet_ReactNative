import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // or another icon library
import { COLORS } from '../constants/theme';
import { TextInput } from 'react-native';

const CustomInput2 = ({source,placeholder,cursorColor,onPress,keyboardComplete,width,height,value,onChangeText}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                cursorColor={cursorColor}
                autoComplete={keyboardComplete}
                
            />
                <TouchableOpacity onPress={onPress} >
                    <Image source={source} style={{width:width,height:height,tintColor:COLORS.primarycolor}}/>
                </TouchableOpacity>
        </View>
    );
};


export default CustomInput2

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.ShadowColor,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginStart:15,
        marginEnd:15,
        marginVertical: 6,
        backgroundColor:COLORS.while
    },
    input: {
        flex: 1,
        textAlign:'left',
        color:COLORS.lightGray2
        
    },
});
