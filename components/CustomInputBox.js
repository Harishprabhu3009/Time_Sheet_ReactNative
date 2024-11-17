import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or another icon library

import { COLORS } from '../constants/theme';

const CustomInputBox = ({ iconName,keyboardComplete,cursorColor, iconSize,error,iconColor,eyeiconSize,eyeiconColor, placeholder,isPassword, value, onChangeText }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    

    return (
        <View style={styles.container}>
            <Icon name={iconName} size={iconSize} color={iconColor} style={{marginRight: 10,}} />
            <TextInput
                style={[styles.input,error && styles.errorInput ]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPassword && !isPasswordVisible}
                cursorColor={cursorColor}
                autoComplete={keyboardComplete}
                
            />
            {isPassword && (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icon
                        name={isPasswordVisible ? 'eye' : 'eye-slash'}
                        size={eyeiconSize}
                        color={eyeiconColor}
                        style={{marginLeft: 10,}}
                    />
                </TouchableOpacity>
            )}
          {/*  {error && <Text style={styles.errorText}>{error}</Text>}*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.primarycolor,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginStart:15,
        marginEnd:15,
        marginVertical: 6,
        backgroundColor:COLORS.gray2
    },

    input: {
        flex: 1,
        
    },

    errorInput:{
        borderColor: 'red',
    },
    errorText:{
        color:'red',
        marginTop:5,
    }
});

export default CustomInputBox;
