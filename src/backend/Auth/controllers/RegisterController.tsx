import {RegisterFirebaseApi} from '../apis/RegisterFirebaseApi'
import {RegisterFireStroreApi} from '../apis/RegisterFireStroreApi'
import {CreateUserService} from '../../Users/services/CreateUserService'
import {CreatePasswordService} from '../../Users/services/CreatePasswordService'
import {RegisterBrevoController} from '../../Brevo/controllers/RegisterBrevoController'
import {CreatePushNotificationIdService} from '../../PushNotifications/services/CreatePushNotificationIdService'
 

export async function  RegisterController(data: {[key: string]: any},isRegisterForm:boolean){
  try {

    const user = CreateUserService(data);
    
    if(isRegisterForm){
      const password = CreatePasswordService(data['password']);
    
      //Registro del firebase
      const firebase_response= await RegisterFirebaseApi(user.email,password.val);
      if(firebase_response !==true) throw new Error(firebase_response);
    }
    
    const pushNotificationId= await CreatePushNotificationIdService();

    //Registro del firestore
    const firestore_response= await RegisterFireStroreApi(user,pushNotificationId);
    if(firestore_response ===false) throw new Error(firestore_response);

    return true;

    
  } catch (error) {
    return error;
  }
  
}
