import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { Text, View, TextInput, Image, ImageBackground, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValidEmail, isValidPassword } from '../utily/Validate'
import axios from 'axios';
import { url, fontSizes } from '../constants';

function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // validate email, pasword
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [keyboardIsShow, setKeyboardIsShow] = useState(false);

  const handleLogin = () => {
    if (email.length > 0 && password.length
      && isValidEmail(email) == true
      && isValidPassword(password) == true) {
      // check email, password using axios
      axios.post(url.login, {
        email: email,
        password: password
      })
        .then(function (response) {
          if (response.data.status == 400) {
            setErrorEmail('Email is not correct')
            setErrorPassword('Password is not correct')
          } else {
            console.log(response.data.token)
            saveToken(response.data.token)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        
        
      }
      navigation.navigate('CRUD')
  }

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
      console.log('Lưu token thành công.');
    } catch (error) {
      console.log('Lưu token thất bại:', error);
    }
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShow(true);
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShow(false);
    })
  })

  return (
    <View >
      <ImageBackground
        source={require('../asserts/background2.jpg')}
        resizeMode='cover'
        style={styles.container}
      >
        <View style={{
          flex: 30,
          width: '100%'
        }}></View>

        <View style={{
          flex: 40,
          width: '100%'
        }}>
          <View style={{
            flex: 40,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 28 }}>Welcome Back</Text>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Login to your account</Text>
          </View>
          <View style={{
            flex: 60,
            paddingHorizontal: 15
          }}>

            <TextInput style={{
              height: 50,
              borderRadius: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              marginBottom: 15
            }}
              placeholder='Email'
              onChangeText={(text) => {
                setErrorEmail(isValidEmail(text) ? '' : 'Email is not correct format')
                setEmail(text);
              }}
            />
            <Text style={{ color: 'red', fontSize: fontSizes.h5 }}>{errorEmail}</Text>
            <TextInput style={{
              height: 50,
              borderRadius: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              marginBottom: 15
            }}
              secureTextEntry={true}
              placeholder='Password'
              placeholderTextColor='black'
              onChangeText={(text) => {
                setErrorPassword(isValidPassword(text) == true ? " " : "Password have more 6 character")
                setPassword(text)
              }
              }
            />
            <Text style={{ color: 'red', fontSize: fontSizes.h5 }}>{errorPassword}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <View style={{ flex: 1 }}></View>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Forgot password?</Text>
            </View>
          </View>

        </View>
        {keyboardIsShow == false &&
          <View style={{
            flex: 30,
            width: '100%',
            alignItems: 'center'
          }}>
            <TouchableOpacity
              style={{
                width: '50%',
                height: 50,
                backgroundColor: '#0099FF',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 5
              }}
              onPress={() => {
                handleLogin();
              }}
            >
              <Text style={{
                padding: 8,
                fontSize: fontSizes.h2
              }}>Login</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: fontSizes.h4 }} >
              Don't have an account?
              <Text style={{ color: 'black', fontWeight: 'bold' }}
                onPress={() => navigation.navigate('Register')}
              >Register</Text>
            </Text>
          </View>
        }
      </ImageBackground>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Login;
