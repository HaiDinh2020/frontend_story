import React from 'react';
import { Text, View } from 'react-native';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UITab from './navigation/UITab';
import { Page } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown:false}}
        />
        <Stack.Screen options={{headerShown:false}} name="Home"  component={UITab} />
        <Stack.Screen name="StoryDetail" component={Page}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
