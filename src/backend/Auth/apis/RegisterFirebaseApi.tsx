import { firebaseConfig } from '../../../FirebaseConfig';

export async function RegisterFirebaseApi(email: string, password: string) {
  try {
    const res = await firebaseConfig.auth().createUserWithEmailAndPassword(email, password);
    return true;
  } 
  catch (error:any) {
    return error.code;
  }
}

    //console.log(error.message); // Obtener el mensaje de errorconsole.log(error.code); // Obtener el código de error
