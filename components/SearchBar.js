import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'; // or another icon library
import { COLORS } from '../constants/theme';

const SearchBar = ({ iconName,keyboardComplete,cursorColor, iconSize,error,iconColor,eyeiconSize,eyeiconColor, placeholder,isPassword, value, onChangeText }) => {
  return (
<View style={styles.container}>
<TouchableOpacity  >
<Icon name={'search'} size={20} color={COLORS.gray} style={{marginRight: 10,}} />

</TouchableOpacity >

            <TextInput
                style={[styles.input,error && styles.errorInput ]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                cursorColor={cursorColor}
                autoComplete={keyboardComplete}
                
            />
            
        </View>

  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.primarycolor,
        borderRadius: 24,
        
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginStart:15,
        marginEnd:15,
        marginVertical: 6,
        backgroundColor:COLORS.gray2
    },

    input: {
        flex: 1,
        color:COLORS.gray,
        textAlign:'left',
        marginStart:12,
        fontWeight:'600'
        
    },

})