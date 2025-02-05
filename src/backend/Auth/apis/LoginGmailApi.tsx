
import {GoogleAuth,} from '@codetrix-studio/capacitor-google-auth'
import { isPlatform } from '@ionic/react';

export async function  LoginGmailApi(){
    try {
        if(!isPlatform('capacitor')){
            GoogleAuth.initialize({
                clientId: '',
                scopes: ['profile', 'email'],
                grantOfflineAccess: true,
              });
        }
        const result = await GoogleAuth.signIn();
        await GoogleAuth.signOut();
        return result;
    } 
    
    catch (error) {
        return error;
    }
    
}
