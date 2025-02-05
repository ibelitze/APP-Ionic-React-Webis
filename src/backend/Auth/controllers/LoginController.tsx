import {CreateLogEventSerService} from "../../Analytics/services/CreateLogEventSerService"
import {LoginApi} from "../apis/LoginApi"
import {GetUserDataApi} from "../../Users/apis/GetUserDataApi"
import {GetToken} from "../apis/GetToken"
import {SetPushNotificationIdApi} from "../../PushNotifications/apis/SetPushNotificationIdApi"
import {Set}  from "../models/SessionVariable"

export async function  LoginController(email: string, password:string){
    try {
        await CreateLogEventSerService('normal_login');
        const response = await LoginApi(email,password);
        if(!response) return "Error al procesar los datos";
        const userData  =   await GetUserDataApi(email);
        const tokenData =   await GetToken();
        
        const tokenSession = tokenData['token']
        const onesignalId = userData['userId']
        
        await SetPushNotificationIdApi(onesignalId)

        await Set('email',email)
        await Set('tokenSession',tokenSession)
        await Set("onesignalId", onesignalId)

        console.log('exito')

        return true;
    } 
    catch (error: any) {
        await CreateLogEventSerService('faildes_normal_login');
        return error.message;
    }
  
}

