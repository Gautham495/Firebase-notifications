import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';

import messaging from '@react-native-firebase/messaging';

const App = () => {
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (e) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFCMToken();

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);
  return (
    <SafeAreaView>
      <Text>Firebase Notification tutorial</Text>
    </SafeAreaView>
  );
};

export default App;
