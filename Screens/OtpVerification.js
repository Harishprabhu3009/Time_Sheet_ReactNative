import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import { OTPInput } from '../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/theme';
import { jwtDecode } from 'jwt-decode';

const OtpVerification = ({route}) => {

const navigation =useNavigation();
const [UserName,setUserName] =useState('');
const [UserMail,setMail] =useState('');
const [UserAccessLevel,setUserAccessLevel] =useState('');
const [UserDept,setUserDept] =useState('');

const idemail=route.params;

/*const [otp, setOTP] = useState('');

  

  const handleSubmit = (otp) => {
    //Alert.alert('OTP Submitted', `Your OTP is: ${otp}`,[{text:'ok',onPress:()=>handleSubmit}]);
    // Add further logic here, like verifying the OTP



    console.log(otp);
      handleApiOtp()
    };

  const handleOTPChange = (otp) => {
    console.log('OTPChange : '+otp)
    setOTP(otp);
    console.log('After')
    console.log('OTPChange : '+otp)
    
  };

*/
const [otp, setOTP] = useState('');

const handleSubmit = (otp) => {
  handleApiOtp(otp);
};

const handleOTPChange = (otp) => {
  setOTP(otp);
};
  








  const root ='http://192.168.43.247:3000/timesheet/checksecret/';
  const handleApiOtp = async (otp) => {
    try {
      console.log(otp);
    
      const dataUser = `${idemail}/${otp}`;      
      console.log(root+dataUser);

      const response = await axios.get(root+dataUser);
      

      // Handle successful login (e.g., store token, navigate to another screen)
      console.log(response.data);
      if (response.data.msg ==="success") {
          console.log('OTP Success');
          console.log(response.data.token);
          try {
            const decoded = jwtDecode(response.data.token);

  
            // Log the decoded token

            setMail(decoded.uemail);
            setUserName(decoded.uname);
            setUserAccessLevel(decoded.ulevel);
            setUserDept(decoded.udept);

            console.log(decoded);
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('AccessLevel', decoded.ulevel);
            await AsyncStorage.setItem('dept', decoded.udept);
            await AsyncStorage.setItem('LoggedIn',JSON.stringify(true));
            navigation.navigate('Activity');
          } catch (error) {
            console.error('Error on Async :', error);
            Alert.alert(error);
          }
          
          
        } else if (response.data.msg === 'otp mismatch') {
          console.log('OTP Mismatch');
          Alert.alert('Wrong OTP',`Try Again`,[{text:'ok',onPress:()=>null}])
        } else {
          console.log('OTP Failed');
        }
    } catch (err) {
      // Handle error
      if (err.response) {
        console.log(err.response.data.message); // Specific error message from server
      } else {
        console.log('Something went wrong. Please try again later.');
      }
    }
  };
  

  return (
    <View style={{
        flex:1,        
        backgroundColor:'#fff',
        alignItems:'center',
        
        }}>

            <View style={{paddingTop:100}}>
                    <Text style={{textAlign:'left',
                                fontSize:28,
                                fontWeight:'900'
                    }} >Hi there!</Text>
            </View>
            <View  >
                 <Text style={{textAlign:'left',
                              fontSize:16,
                              fontWeight:'500',
                              marginStart:10,
                              marginTop:20
                              
                 }} >OTP sent to 
                 <Text style={{fontSize:14,
                               fontWeight:'800', 
                 }}> {idemail}</Text></Text>
          </View>
          <View >
          <OTPInput length={6} onOTPChange={handleOTPChange} onSubmit={handleSubmit} />
           <View style={{marginTop:40}}>
           <Button title="Submit OTP" onPress={() => handleSubmit(otp)} />

           </View>
          </View>

    </View>
  )
}

export default OtpVerification

const styles = StyleSheet.create({})