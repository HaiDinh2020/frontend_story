/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    const alarmNotifData = {
      title: 'My Notification Title',
      message: 'My Notification Message',
      channel: 'my_channel_id',
      small_icon: 'ic_launcher',
    };
    // trigger the alarm
    ReactNativeAN.sendNotification(alarmNotifData);
  });
  
  function HeadlessCheck({isHeadless}) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
    return <App />;
  }

AppRegistry.registerComponent(appName, () => App);
