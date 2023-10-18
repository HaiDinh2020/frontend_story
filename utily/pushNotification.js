import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, { firebase } from '@react-native-firebase/messaging';
import NavigationServices from '../navigation/NavigationServices';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const GetFCMToke = async () => {
  let fcmtoken = await AsyncStorage.getItem("fcmtoken")
  console.log('old token', fcmtoken)
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('new token', fcmtoken)
        await AsyncStorage.setItem("fcmtoken", fcmtoken)
      }
    } catch (error) {
      console.log("eror in fcmtoken", error)
    }
  }
}

const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    // console.log(
    //   'Notification caused app to open from background state:',
    //   remoteMessage,
    // );

    if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
      console.log('redirect',remoteMessage?.data)
      NavigationServices.navigate(remoteMessage?.data?.redirect_to, {id: remoteMessage?.data?.id })
    } else {
      NavigationServices.navigate("Menu")
    }
  })

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
        if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to) {
          setTimeout(() => {
            NavigationServices.navigate(remoteMessage?.data?.redirect_to, {id: remoteMessage?.data?.id })
            console.log('redirect')
          }, 1000)
        }  else {
          NavigationServices.navigate("Menu")
        }
      }
      
    })

  messaging().onMessage(async remoteMessage => {
    console.log("notification on froground state....", remoteMessage)
  })
}

export { requestUserPermission, GetFCMToke, NotificationListener }