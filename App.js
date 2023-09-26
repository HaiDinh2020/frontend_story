import React from 'react';
import { Text, View } from 'react-native';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store/store';
import UITab from './navigation/UITab';
import { Menu, Page, Pages, Register } from './screens';
import InputText from './component/InputText';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, orientation:'portrait' }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false, orientation:'portrait' }}
          />
          <Stack.Screen options={{ headerShown: false, orientation:'portrait' }} name="Home" component={UITab} />
          <Stack.Screen options={{headerShown: false, orientation:'portrait'}} name='CRUD' component={InputText} />
          <Stack.Screen options={{ headerShown: false, orientation:'landscape' }} name="StoryDetail" component={Page} />
          <Stack.Screen options={{ headerShown: false, orientation:'portrait' }} name="Menu" component={Menu} />
          {/* <Stack.Screen options={{ headerShown: false, orientation:'landscape' }} name="Pages" component={Pages} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
