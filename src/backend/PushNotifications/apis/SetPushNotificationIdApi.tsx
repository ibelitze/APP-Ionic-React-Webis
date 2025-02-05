import OneSignal from 'onesignal-cordova-plugin';
import { isPlatform } from '@ionic/react';

export async function  SetPushNotificationIdApi(externalUserId: string){
    if(isPlatform('capacitor')){
        try {        
            OneSignal.setExternalUserId(externalUserId, (results) => {
                console.log('Results of setting external user id');
                console.log(results);
                });
            return true;
        } 
        catch (error:any) {
            return error.code;
        }
    }
}
