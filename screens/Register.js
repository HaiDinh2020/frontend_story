import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { Text, View, TextInput, Image, ImageBackground, 
    StyleSheet, TouchableOpacity, Keyboard, ScrollView
} from 'react-native';
import { isValidName, isValidEmail, isValidPassword, isValidPasswordConfirm } from '../utily/Validate'
import axios from 'axios';
import { url, fontSizes } from '../constants';

function Register({ navigation }) {

    const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState();
    // validate email, pasword
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('');

    const [keyboardIsShow, setKeyboardIsShow] = useState(false);

    const handleRegister = () => {
        if (name.length && email.length > 0 && password.length && passwordConfirm.length
            && isValidName(name) && isValidEmail(email) == true
            && isValidPassword(password) && isValidPasswordConfirm(password, passwordConfirm) == true) {
            // check email, password using axios
            axios.post(url.register, {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirm
            })
                .then(function (response) {
                    if (response.data.status == 500) {
                        console.log(response.data.message)
                        setErrorEmail('Email is not correct')
                        setErrorPassword('Password is not correct')
                    } else {
                        console.log(response.data.message)
                        navigation.navigate('Login')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShow(true);
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShow(false);
        })
    })

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}} >
            <ImageBackground
                source={require('../asserts/background2.jpg')}
                resizeMode='cover'
                style={styles.container}
            >

                <View style={{
                    flex: 80,
                    width: '100%'
                }}>
                    <View style={{
                        flex: 30,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 28 }}>Welcome Back</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Register to your account</Text>
                    </View>
                    <View style={{
                        flex: 70,
                        paddingHorizontal: 15
                    }}>
                        <Text style={{color:'black', fontSize:fontSizes.h4, padding: 5}}>Name</Text>
                        <TextInput style={{
                            height: 50,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}
                            onChangeText={(text) => {
                                setErrorName(isValidName(text) ? '' : 'Name is not correct format')
                                setName(text);
                            }}
                        />
                        <Text style={{ color: 'red', fontSize: fontSizes.h5 }}>{errorName}</Text>

                        <Text style={{color:'black', fontSize:fontSizes.h4, padding: 5}}>Email</Text>
                        <TextInput style={{
                            height: 50,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}
                            onChangeText={(text) => {
                                setErrorEmail(isValidEmail(text) ? '' : 'Email is not correct format')
                                setEmail(text);
                            }}
                        />
                        <Text style={{ color: 'red', fontSize: fontSizes.h5 }}>{errorEmail}</Text>

                        <Text style={{color:'black', fontSize:fontSizes.h4, padding: 5}}>Password</Text>
                        <TextInput style={{
                            height: 50,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}
                            secureTextEntry={true}
                            placeholderTextColor='black'
                            onChangeText={(text) => {
                                setErrorPassword(isValidPassword(text) == true ? " " : "Password have more 6 character")
                                setPassword(text)
                            }}
                        />
                        <Text style={{ color: 'red', fontSize: fontSizes.h5 }}>{errorPassword}</Text>

                        <Text style={{color:'black', fontSize:fontSizes.h4, padding: 5}}>Confirm Password</Text>
                        <TextInput style={{
                            height: 50,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            marginBottom: 5
                        }}
                            secureTextEntry={true}
                            placeholderTextColor='black'
                            onChangeText={(text) => {
                                setErrorPasswordConfirm(isValidPasswordConfirm(password, text) == true ? " " : "Password confirm didn't same password")
                                setPasswordConfirm(text)
                            }}
                        />
                        <Text style={{ color: 'red', fontSize: fontSizes.h5 }}>{errorPasswordConfirm}</Text>

                    </View>

                </View>
                {keyboardIsShow == false &&
                    <View style={{
                        flex: 20,
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
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                handleRegister();
                            }}
                        >
                            <Text style={{
                                padding: 8,
                                fontSize: fontSizes.h2
                            }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ImageBackground>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default Register;
