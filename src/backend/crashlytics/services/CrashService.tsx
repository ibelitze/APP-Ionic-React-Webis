import { FirebaseCrashlytics } from '@capacitor-community/firebase-crashlytics';


export async function  CrashService(){
    try {
        await FirebaseCrashlytics.crash({ message: 'Test' });
        
    } 
    
    catch (error) {
        return error;
    }
  
}


