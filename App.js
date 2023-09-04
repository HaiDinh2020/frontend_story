import React from 'react';
import { Text, View } from 'react-native';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store/store';
import UITab from './navigation/UITab';
import { Page, Register } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen options={{ headerShown: false }} name="Home" component={UITab} />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="StoryDetail" component={Page} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
