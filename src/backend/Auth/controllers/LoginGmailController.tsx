
import {CreateLogEventSerService} from "../../Analytics/services/CreateLogEventSerService"
import {LoginGmailApi} from "../apis/LoginGmailApi"
import {CreateUserService} from '../../Users/services/CreateUserService'
import {CreatePushNotificationIdService} from '../../PushNotifications/services/CreatePushNotificationIdService'
import {RegisterFireStroreApi} from '../apis/RegisterFireStroreApi'
import {GetUserDataApi} from "../../Users/apis/GetUserDataApi"
import {GetToken} from "../apis/GetToken"
import {Set}  from "../models/SessionVariable"
import {SetPushNotificationIdApi} from "../../PushNotifications/apis/SetPushNotificationIdApi"

export async function  LoginGmailController(){
    try {
        await CreateLogEventSerService('gmail_login');
        const gmailData =  await LoginGmailApi();
        const email = gmailData['email']
        const userData  =   await GetUserDataApi(email);

        //registramos
        if(userData=="No such document!"){
            const dataRegister :{[key: string]: any} = [];

            dataRegister['email'] = gmailData['email']
            dataRegister['birthday'] = '20/07/1999'
            dataRegister['country'] = 'N/A'
            dataRegister['first_name'] = gmailData['givenName']
            dataRegister['last_name'] = gmailData['familyName']
            dataRegister['page'] =  'N/A'
                
            const user = CreateUserService(dataRegister);
    
            const pushNotificationId= await CreatePushNotificationIdService();
            const firestore_response= await RegisterFireStroreApi(user,pushNotificationId);
            if(firestore_response ===false) throw new Error(firestore_response);
            const tokenData =   await GetToken();

            const tokenSession = tokenData['token']
            const onesignalId = pushNotificationId.userId
            await SetPushNotificationIdApi(onesignalId)

            await Set('email',email)
            await Set('tokenSession',tokenSession)
            await Set("onesignalId", onesignalId)
            console.log('Registro exitoso')
            return true;
        }

        else{
            const tokenData =   await GetToken();
            const tokenSession = tokenData['token']
            const onesignalId = userData['userId']
            
            await SetPushNotificationIdApi(onesignalId)

            await Set('email',email)
            await Set('tokenSession',tokenSession)
            await Set("onesignalId", onesignalId)

            console.log('Login Exitoso')
            return true;
        }



        return true;
    } 
    
    catch (error) {
        return error;
    }
    
}
