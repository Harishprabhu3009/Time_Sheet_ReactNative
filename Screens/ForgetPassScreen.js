import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import images from '../constants/images'
import { CustomButton, CustomInputBox } from '../components'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const ForgetPassScreen = () => {

  const navigation =useNavigation();
  let valid =true;
  const [email,Setemail] =useState('');
  const [emailError,SetEmailError] =useState('');


  //Email Validation
const validateEmail =(email)=>{
  const EMAILPATTERN =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAILPATTERN.test(email);
};

const CheckEmailOnForgetPass = async () => {
  //Logic of the Login


  if (email === '') {
      SetEmailError('Email is required.');
      valid=false;
  } else if (!validateEmail(email)) {
      SetEmailError('Invalid email address.');
      valid=false;
  } else {
      
 
      SetEmailError(' ');

  }

  if (valid) {
                
       handleForgetPass()
  
}

}




const root ='http://172.16.100.152:3000/timesheet/resetpassword/';
const handleForgetPass = async () => {
  try {
    const dataUser =email
    const response = await axios.get(root+dataUser);
    

    // Handle successful login (e.g., store token, navigate to another screen)
    console.log(response.data);
    if (response.data==="reset") {
        console.log('ForgetPass Success');
        Alert.alert('Password is Sent your Email');        

        navigation.navigate('Login')

    }else{
        //console.log('ForgetPass Failed');
        //Alert.alert('ForgetPassword Failed');
    }
  } catch (err) {
    // Handle error
    if (err.response) {
      Setemail(err.response.data.message); // Specific error message from server
    } else {
      Setemail('Something went wrong. Please try again later.');
    }
  }
};







  return (
    <View style={{
      flex:1,        
      backgroundColor:'#fff',
  }}>
              <View style={{
          justifyContent:'center',
          alignItems:'center',
          marginVertical:80,
          
      }}>
              <Image source={images.InnowellIMG} style={{
              height:40,
              width:200
      }} />
      </View>
      <View style={{paddingTop:8,paddingStart:10}}>
               <Text style={{textAlign:'left',
                            fontSize:24,
                            fontWeight:'900'
               }} >Save your account now!</Text>
        </View>
        <View style={{padding:10}}>
               <Text style={{textAlign:'left',
                            fontSize:16,
                            fontWeight:'600'
               }} >Reset Password</Text>
        </View>
        <View style={{padding:10}}>
        <CustomInputBox
                iconName="envelope"
                placeholder="email@gmail.com"
                value={email}
                onChangeText={Setemail}
                iconSize={14}
                
            />
                          <View  >
                 <Text style={{textAlign:'right',
                              fontSize:12,
                              fontWeight:'800',
                              marginEnd:20,
                              color:'#ff0000',
                              marginBottom:10 
                              
                              
                 }} >{emailError}</Text>
          </View>
        
          <View style={{
                        
                      marginTop:20,
                      marginStart:180,
                      marginEnd:20
          }}>
            <CustomButton title="Reset"  onPress={CheckEmailOnForgetPass}
        style={{ backgroundColor: '#0776DD' }} 
        textStyle={{ fontSize: 16,
            
                
         }}
                 />
          </View>

   
        </View>
    </View>
  )
}

export default ForgetPassScreen

const styles = StyleSheet.create({})