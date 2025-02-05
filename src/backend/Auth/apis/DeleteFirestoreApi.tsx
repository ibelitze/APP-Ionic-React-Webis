import {firebaseConfig} from '../../../FirebaseConfig';


export async function  DeleteFirestoreApi(email:string){
    try {
        const res = await firebaseConfig.firestore().collection('users').doc(email).delete();
        return true;
    } 
    catch (error:any) {
        return error.code;
    }
}
