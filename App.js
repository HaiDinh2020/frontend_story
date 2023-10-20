import React, { useEffect } from 'react';
import 'react-native-reanimated'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GetFCMToke, NotificationListener, requestUserPermission } from './utily/pushNotification';
import { Route } from './navigation/Router';

export default function App() {
  useEffect(() => {
    requestUserPermission();
    GetFCMToke()
    NotificationListener();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Route />
      </Provider>
    </GestureHandlerRootView>
  );
}
