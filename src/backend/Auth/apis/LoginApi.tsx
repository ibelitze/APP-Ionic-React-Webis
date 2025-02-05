import {firebaseConfig} from '../../../FirebaseConfig';


export async function  LoginApi(email: string, password:string){
    try {
      const res = await firebaseConfig.auth().signInWithEmailAndPassword(email, password);
      return true;      
    } 
    catch (error) {
      return false;
    }
}
