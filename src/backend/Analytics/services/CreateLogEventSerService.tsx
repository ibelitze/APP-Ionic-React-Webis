import { firebaseAnalyticsConfig } from "../../../FirebaseAnalytics";


export async function  CreateLogEventSerService(log: string){
    try {
        return await firebaseAnalyticsConfig.logEvent({name: log,params: {}});
    } 
    catch (error) {
        return error;
    }
  
}


