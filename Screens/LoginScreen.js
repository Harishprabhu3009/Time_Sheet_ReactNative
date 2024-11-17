import {   Alert, BackHandler, Image,  Text, View } from 'react-native'
import React, {  useState } from 'react'
import images from '../constants/images'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { CustomInputBox,CustomButton } from '../components'
import axios from 'axios'
import LoadingProcess from '../components/LoadingProcess'
import { COLORS } from '../constants/theme'
import { jwtDecode } from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'


let valid = true;


const LoginScreen = () => {




const [UserName,setUserName] =useState('');
const [UserMail,setMail] =useState('');
const [UserAccessLevel,setUserAccessLevel] =useState('');
const [UserDept,setUserDept] =useState('');
const [loading, setLoading] = useState(false);



    const handleBackPress =() =>{

        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [{
            text:'Cancel',
            onPress:() =>null,
            style:'cancel',
          },
            {
            text:'Exit',
            onPress:() =>BackHandler.exitApp(),
          },
        ]
        )
       return true;
      };
      
      
      useFocusEffect(
        React.useCallback(()=>{
          BackHandler.addEventListener('hardwareBackPress',handleBackPress);
        return()=>{
          BackHandler.removeEventListener('hardwareBackPress',handleBackPress);
        };
        }),
      );

const navigation=useNavigation();

const [email,Setemail] =useState('');
const [Pass,SetPass] =useState('');

const [emailError,SetEmailError] =useState('');
const [passError,SetPassError] =useState('');
//asyncStorage



///////////////////







////////////////////////////////////////////  

//checking condition in Email and Password

//Email Validation
const validateEmail =(email)=>{
    const EMAILPATTERN =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAILPATTERN.test(email);
};

//Pass Validation
const validatePass =(Pass)=>{
    
    return Pass.length >=5;
};





    //Login OnPRESS EVENT
    const CheckLogin = async () => {
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

        
        if (Pass === '') {
            SetPassError('Password is required.');
            valid=false;
        } else if (!validatePass(Pass)) {
            SetPassError('Password must be at least 8 charactes.');
                valid=false;

        } else {

            SetPassError(' ');

        }

            if (valid) {
                setLoading(true);
                handleLogin()        
              
            }


               
        }



        if (loading) {
          return (
         <View style={{flex:1,
                       alignItems:'center',
                       justifyContent:"center",
                       backgroundColor:COLORS.transparentBlack7
         }}>

            <Text style={{fontSize:20,
                           color:COLORS.while
            }}>Please Wait !</Text>

         </View>
          );
        }

        const root ='http://192.168.43.247:3000/timesheet/loginuser';
        const handleLogin = async () => {
          try {
            const dataUser =`/${email}/${Pass}`;
            const response = await axios.get(root+dataUser);
            

            // Handle successful login (e.g., store token, navigate to another screen)
            console.log(response.data);
            if (response.data.msg ==="otp sent") {
                console.log('OTP Success');
                setLoading(false);
                navigation.navigate('OtpVerification',email)
                
            }else if(response.data.msg ==="success"){
              console.log('Log Success')
              
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
                setLoading(false);
              } catch (error) {
                console.error('Error on Async :', error);
                Alert.alert(error);
              }
              

             }else if(response.data.msg ==="Wrong Password"){
              setLoading(false);
              Alert.alert('Wrong Password',`Try Again`,[{text:'ok',onPress:()=>null}])
                console.log('Wrong Password')
            
             }else{
              setLoading(false);
                console.log('Log Failed');
                Alert.alert('Login Failed');
            }
          } catch (err) {
            // Handle error
            setLoading(false);
            if (err.response) {
              SetPass(err.response.data.message); // Specific error message from server
            } else {
              SetPass('Something went wrong. Please try again later.');
            }
          }
        };
      
          
    //////////////////////////////////////////////////////////////////
    const handleForgetPass=()=>{
        navigation.navigate('ForgetPass');
    }
    /////////////////////////////////////////////////////////////////
          






        /////////////////////////////
       

    
    //Main Render Screen
  return (
    <View style={{
        flex:1,        
        backgroundColor:'#fff',
    }}>
                <View style={{
            justifyContent:'center',
            alignItems:'center',
            marginVertical:50,
            
        }}>
                <Image source={images.InnowellIMG} style={{
                height:40,
                width:200
        }} />
        </View>
        <View style={{padding:10}}>
                 <Text style={{textAlign:'left',
                              fontSize:24,
                              fontWeight:'900'
                 }} >Welcome !</Text>
          </View>
          <View  >
                 <Text style={{textAlign:'left',
                              fontSize:12,
                              fontWeight:'500',
                              marginStart:10
                              
                 }} >Login to your account and enhance your Productivity</Text>
          </View>
          <View style={{paddingTop:10}}>
                 <Text style={{textAlign:'left',
                              fontSize:18,
                              fontWeight:'900',
                              marginStart:10,
                              marginBottom:10                        
                 }} >Email ID</Text>
          </View>
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


          <View style={{paddingTop:10}}>
                 <Text style={{textAlign:'left',
                              fontSize:18,
                              fontWeight:'900',
                              marginStart:10,
                              marginBottom:10
                 }} >Password</Text>
          </View>
          <CustomInputBox
                iconName="lock"
                placeholder="********"
                value={Pass}
                iconSize={18}
                eyeiconSize={16}
                onChangeText={SetPass}
                secureTextEntry={true}
                isPassword={true}
            />
                        <View  >
                 <Text style={{textAlign:'right',
                              fontSize:12,
                              fontWeight:'800',
                              marginEnd:20,
                              color:'#ff0000',
                              marginBottom:10 //change
                              
                              
                 }} >{passError}</Text>
          </View>


          <View onTouchStart={handleForgetPass} >
                 <Text style={{textAlign:'right',
                              fontSize:14,
                              fontWeight:'600',
                              marginEnd:20,
                              marginTop:10,
                              
                              
                 }}  >Forget Password?</Text>
          </View>

          <View style={{
                        justifyContent:'center',
                        padding:60
          }}>
            <CustomButton title="LOGIN"  onPress={CheckLogin}
        style={{ backgroundColor: '#0776DD' }} 
        textStyle={{ fontSize: 16,
            
                
         }}
                 />
          </View>


    </View>
)
}

export default LoginScreen
