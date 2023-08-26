import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { Text, View, TextInput, Image, ImageBackground, StyleSheet, Button } from 'react-native';


function Login({navigation}) {

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
            alignItems:'center'
          }}>
            <Text style={{ color: 'black', fontWeight:'bold', fontSize: 28 }}>Welcome Back</Text>
            <Text  style={{ color: 'black', fontWeight:'bold', fontSize: 16 }}>Login to your account</Text>
          </View>
          <View style={{
            flex: 60,
            paddingHorizontal: 15
          }}>
            
            <TextInput  style={{
              height: 50,
              borderRadius: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              marginBottom: 15
            }} 
              placeholder='UserName'
            />
            <TextInput  style={{
              height: 50,
              borderRadius: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              marginBottom: 15
            }} 
              placeholder='Password'
            />
        
            
            <View
              style={{
                flexDirection:'row',
                alignItems:'center'
              }}
            >
              <View style={{flex:1}}></View>
              <Text style={{color:'black', fontWeight:'bold'}}>Forgot password?</Text>
            </View>
          </View>

        </View>
        <View style={{
          flex: 30,
          marginHorizontal:15
        }}>
          <Button
            title="Login"
            onPress={() =>
              navigation.navigate('Home')
            }
          />
        </View>
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
