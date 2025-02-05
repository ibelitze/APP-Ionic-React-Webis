import {firebaseConfig} from '../../../FirebaseConfig';
import {User} from '../../Users/models/User'
import {PushNotificationId} from '../../PushNotifications/models/PushNotificationId'


export async function  RegisterFireStroreApi(user: User,pushNotificationId:PushNotificationId){
    try {
        const data = Object.assign(user,pushNotificationId);
        const response = await firebaseConfig.firestore().collection('users').doc(user.email).set(data);
        return true;
    } 
    catch (error:any) {
        return error.code;
    }
}
