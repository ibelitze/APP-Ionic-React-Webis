import React from 'react';
import OneSignal from 'onesignal-cordova-plugin';
import { useHistory } from 'react-router-dom';
import { isPlatform } from '@ionic/react';

const OneSignalReact: React.FC = () => {
    const history = useHistory();

    OneSignalInit();



    // Call this function when your app starts
    function OneSignalInit(): void {

      if(isPlatform('capacitor')){
        console.log('registro')

        OneSignal.setAppId("323501fb-2120-4af2-9fa8-94339d1880b8");

      
        OneSignal.setNotificationOpenedHandler(function(jsonData: any ) {
            console.log(jsonData)
            // history.replace("/resumenPush/"+hash+"/"+id)
            return
        });
      
        OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
            console.log("User accepted notifications: " + accepted);
        });

      }
    }


    return (
      <>  </>
    );
};

export default OneSignalReact;
